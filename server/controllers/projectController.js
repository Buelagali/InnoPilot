const ProjectIdea = require('../models/ProjectIdea');
const IdeaVersion = require('../models/IdeaVersion');
const Problem = require('../models/Problem');
const aiService = require('../services/ai/AIService');

// @desc    Generate multiple project ideas from a problem (Module 4)
// @route   POST /api/projects/generate
// @access  Private
exports.generateIdeas = async (req, res, next) => {
  try {
    const { problemId, problemText, domain, title } = req.body;
    let problemContext = {};

    if (problemId) {
      const problem = await Problem.findById(problemId);
      if (problem) {
        problemContext = {
          title: problem.title,
          description: problem.description,
          domain: problem.domain,
          identifiedProblem: problem.discoveryReport?.identifiedProblem || problem.title,
          problemDescription: problem.discoveryReport?.problemDescription || problem.description,
        };
      }
    } else {
      problemContext = {
        title: title || 'Problem in ' + (domain || 'General'),
        description: problemText || 'User-defined problem',
        domain: domain || 'General',
      };
    }

    const ideas = await aiService.generateIdeas(problemContext, req.user);

    // Save generated ideas to database linked to user and problem
    const savedIdeas = [];
    for (const idea of ideas) {
      const newIdea = await ProjectIdea.create({
        userId: req.user.id,
        problemId: problemId || null,
        title: idea.title,
        problemAddressed: idea.problemAddressed,
        proposedSolution: idea.proposedSolution,
        targetUsers: idea.targetUsers || [],
        coreFeatures: idea.coreFeatures || [],
        aiRole: idea.aiRole || '',
        techStack: idea.techStack || {},
        expectedOutcome: idea.expectedOutcome || '',
        innovationOpportunities: idea.innovationOpportunities || [],
        difficultyLevel: idea.difficultyLevel || 'Intermediate',
        estimatedDevelopmentTime: idea.estimatedDevelopmentTime || '3 - 4 Months',
        domain: problemContext.domain || 'General',
        currentVersion: 1,
        isSaved: true,
      });

      // Record Version 1 in IdeaVersion collection
      await IdeaVersion.create({
        ideaId: newIdea._id,
        versionNumber: 1,
        evolutionAction: 'Initial Generation',
        changeSummary: 'Base idea created from problem discovery analysis.',
        snapshot: {
          title: newIdea.title,
          problemAddressed: newIdea.problemAddressed,
          proposedSolution: newIdea.proposedSolution,
          targetUsers: newIdea.targetUsers,
          coreFeatures: newIdea.coreFeatures,
          aiRole: newIdea.aiRole,
          techStack: newIdea.techStack,
          expectedOutcome: newIdea.expectedOutcome,
          innovationOpportunities: newIdea.innovationOpportunities,
          difficultyLevel: newIdea.difficultyLevel,
          estimatedDevelopmentTime: newIdea.estimatedDevelopmentTime,
        },
      });

      savedIdeas.push(newIdea);
    }

    if (problemId) {
      await Problem.findByIdAndUpdate(problemId, { status: 'ideas_generated' });
    }

    res.status(201).json({
      success: true,
      message: `Generated ${savedIdeas.length} project ideas successfully.`,
      ideas: savedIdeas,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Evolve / Improve an existing idea (Module 5)
// @route   POST /api/projects/:id/evolve
// @access  Private
exports.evolveIdea = async (req, res, next) => {
  try {
    const { action, customInstruction } = req.body;
    const idea = await ProjectIdea.findOne({ _id: req.params.id, userId: req.user.id });

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    const evolutionResult = await aiService.evolveIdea(
      idea,
      action || 'Improve Idea',
      customInstruction || '',
      req.user
    );

    const nextVersionNumber = (idea.currentVersion || 1) + 1;
    const evolvedData = evolutionResult.evolvedIdea || {};

    // Update project idea with new evolved data
    idea.title = evolvedData.title || idea.title;
    idea.problemAddressed = evolvedData.problemAddressed || idea.problemAddressed;
    idea.proposedSolution = evolvedData.proposedSolution || idea.proposedSolution;
    idea.targetUsers = evolvedData.targetUsers || idea.targetUsers;
    idea.coreFeatures = evolvedData.coreFeatures || idea.coreFeatures;
    idea.aiRole = evolvedData.aiRole || idea.aiRole;
    idea.techStack = evolvedData.techStack || idea.techStack;
    idea.expectedOutcome = evolvedData.expectedOutcome || idea.expectedOutcome;
    idea.innovationOpportunities = evolvedData.innovationOpportunities || idea.innovationOpportunities;
    idea.difficultyLevel = evolvedData.difficultyLevel || idea.difficultyLevel;
    idea.estimatedDevelopmentTime = evolvedData.estimatedDevelopmentTime || idea.estimatedDevelopmentTime;
    idea.currentVersion = nextVersionNumber;

    await idea.save();

    // Store new version in MongoDB
    const versionRecord = await IdeaVersion.create({
      ideaId: idea._id,
      versionNumber: nextVersionNumber,
      evolutionAction: action || 'Evolved Version',
      changeSummary: evolutionResult.changeSummary || `Version ${nextVersionNumber} updated with ${action}`,
      snapshot: {
        title: idea.title,
        problemAddressed: idea.problemAddressed,
        proposedSolution: idea.proposedSolution,
        targetUsers: idea.targetUsers,
        coreFeatures: idea.coreFeatures,
        aiRole: idea.aiRole,
        techStack: idea.techStack,
        expectedOutcome: idea.expectedOutcome,
        innovationOpportunities: idea.innovationOpportunities,
        difficultyLevel: idea.difficultyLevel,
        estimatedDevelopmentTime: idea.estimatedDevelopmentTime,
      },
    });

    res.status(200).json({
      success: true,
      message: `Idea successfully evolved to v${nextVersionNumber} (${action}).`,
      idea,
      version: versionRecord,
      changeSummary: evolutionResult.changeSummary,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all versions of an idea for comparison (Module 5)
// @route   GET /api/projects/:id/versions
// @access  Private
exports.getIdeaVersions = async (req, res, next) => {
  try {
    const idea = await ProjectIdea.findOne({ _id: req.params.id, userId: req.user.id });
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    const versions = await IdeaVersion.find({ ideaId: idea._id }).sort({ versionNumber: -1 });

    res.status(200).json({
      success: true,
      count: versions.length,
      currentVersion: idea.currentVersion,
      versions,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Revert / Restore a specific version of an idea
// @route   POST /api/projects/:id/restore-version/:versionNumber
// @access  Private
exports.restoreIdeaVersion = async (req, res, next) => {
  try {
    const { versionNumber } = req.params;
    const idea = await ProjectIdea.findOne({ _id: req.params.id, userId: req.user.id });
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    const versionDoc = await IdeaVersion.findOne({
      ideaId: idea._id,
      versionNumber: Number(versionNumber),
    });

    if (!versionDoc) {
      return res.status(404).json({
        success: false,
        message: `Version ${versionNumber} not found.`,
        errorCode: 'VERSION_NOT_FOUND',
      });
    }

    const snap = versionDoc.snapshot;
    idea.title = snap.title;
    idea.problemAddressed = snap.problemAddressed;
    idea.proposedSolution = snap.proposedSolution;
    idea.targetUsers = snap.targetUsers;
    idea.coreFeatures = snap.coreFeatures;
    idea.aiRole = snap.aiRole;
    idea.techStack = snap.techStack;
    idea.expectedOutcome = snap.expectedOutcome;
    idea.innovationOpportunities = snap.innovationOpportunities;
    idea.difficultyLevel = snap.difficultyLevel;
    idea.estimatedDevelopmentTime = snap.estimatedDevelopmentTime;
    idea.currentVersion = Number(versionNumber);

    await idea.save();

    res.status(200).json({
      success: true,
      message: `Idea restored to v${versionNumber}.`,
      idea,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user's project library / saved ideas (Module 12)
// @route   GET /api/projects
// @access  Private
exports.getProjects = async (req, res, next) => {
  try {
    const { domain, search, sort, difficulty } = req.query;
    const query = { userId: req.user.id };

    if (domain && domain !== 'All') {
      query.domain = domain;
    }
    if (difficulty && difficulty !== 'All') {
      query.difficultyLevel = difficulty;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { proposedSolution: { $regex: search, $options: 'i' } },
        { problemAddressed: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = { updatedAt: -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'title') sortOption = { title: 1 };
    if (sort === 'version') sortOption = { currentVersion: -1 };

    const projects = await ProjectIdea.find(query).sort(sortOption).populate('problemId', 'title domain');

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single project idea by ID
// @route   GET /api/projects/:id
// @access  Private
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await ProjectIdea.findOne({ _id: req.params.id, userId: req.user.id }).populate('problemId');
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update project idea manually
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    const project = await ProjectIdea.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      project,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Duplicate an idea (Module 12)
// @route   POST /api/projects/:id/duplicate
// @access  Private
exports.duplicateProject = async (req, res, next) => {
  try {
    const original = await ProjectIdea.findOne({ _id: req.params.id, userId: req.user.id });
    if (!original) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    const duplicated = await ProjectIdea.create({
      userId: req.user.id,
      problemId: original.problemId,
      title: `${original.title} (Copy)`,
      problemAddressed: original.problemAddressed,
      proposedSolution: original.proposedSolution,
      targetUsers: original.targetUsers,
      coreFeatures: original.coreFeatures,
      aiRole: original.aiRole,
      techStack: original.techStack,
      expectedOutcome: original.expectedOutcome,
      innovationOpportunities: original.innovationOpportunities,
      difficultyLevel: original.difficultyLevel,
      estimatedDevelopmentTime: original.estimatedDevelopmentTime,
      domain: original.domain,
      currentVersion: 1,
    });

    await IdeaVersion.create({
      ideaId: duplicated._id,
      versionNumber: 1,
      evolutionAction: 'Duplicated Copy',
      changeSummary: `Cloned from ${original.title} v${original.currentVersion}`,
      snapshot: {
        title: duplicated.title,
        problemAddressed: duplicated.problemAddressed,
        proposedSolution: duplicated.proposedSolution,
        targetUsers: duplicated.targetUsers,
        coreFeatures: duplicated.coreFeatures,
        aiRole: duplicated.aiRole,
        techStack: duplicated.techStack,
        expectedOutcome: duplicated.expectedOutcome,
        innovationOpportunities: duplicated.innovationOpportunities,
        difficultyLevel: duplicated.difficultyLevel,
        estimatedDevelopmentTime: duplicated.estimatedDevelopmentTime,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Project idea duplicated successfully.',
      project: duplicated,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete project idea
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await ProjectIdea.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project idea not found.',
        errorCode: 'IDEA_NOT_FOUND',
      });
    }

    // Delete associated versions
    await IdeaVersion.deleteMany({ ideaId: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Project idea deleted successfully.',
    });
  } catch (err) {
    next(err);
  }
};
