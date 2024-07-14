import Score from "../models/score.Model.js";
import User from "../models/user.Model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// score adding controller
const addScore = asyncHandler(async (req, res) => {
    const { userName, score } = req.body;

    if (!userName || score == null) {
        throw new ApiError(400, "userName and score are required!");
    }

    const user = await User.findOne({ userName });

    if (!user) {
        throw new ApiError(404, "User not found!");
    }

    // const userScore = await Score.findOne({ user: user._id });
    // if (!userScore) {
    //     userScore = new Score({
    //         user: user._id,
    //         score,
    //     });
    //     await userScore.save();
    // } else {
    //     userScore.score = score;
    //     await userScore.save();
    // }

    // ---------optimized approach----------
    const userScore = await Score.findOneAndUpdate(
        { user: user._id },
        { $set: { score } },
        { new: true, upsert: true }
    );

    res.status(201).json(new ApiResponse(201, userScore, "Score added successfully!"));
});


// scores retirieving controller for users
const getUserScore = asyncHandler(async (req, res) => {
    const user = req.user;

    const userScore = await Score.findOne({ user: user._id });
    
    if (!userScore) {
        res.status(200).json(new ApiResponse(200, { userName: user.userName }));
    }

    res.status(200).json(new ApiResponse(200, { userName: user.userName, userScore: userScore.score }));
});

// scores retirieving controller for leaderBoard
const getAllUserScores = asyncHandler(async (req, res) => {
    try {
      const scores = await Score.find().populate('user', 'userName').sort({ score: -1 });
  
      if (!scores || scores.length === 0) {
        throw new ApiError(404, 'No scores found!');
      }
  
      res.status(200).json(new ApiResponse(200, scores, "Scores fetched successfully!"));
    } catch (error) {
      throw new ApiError(500, "Error fetching scores");
    }
  });


export { addScore, getUserScore, getAllUserScores };
