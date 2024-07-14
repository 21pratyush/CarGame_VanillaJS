import User from "../models/user.Model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const Cookie_options = {
  httpOnly: true,
  secure: true,
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token."
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //   res.status(200).json({
  //       message: "registration api testing..."
  //   })

  const { userName, email, password } = req.body;

  //validation
  if ([userName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required!");
  }
    // console.log("userName:", userName);
    // console.log("email:", email);
    // console.log("password:", password);

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });
  if (existingUser) {
    throw new ApiError(409, "User with email or username already exist.");
  }

  // Create new user
  const user = await User.create({
    userName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registring the user.");
  }

  //returning response by utility
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully!"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password)
  if (!userName) {
    throw new ApiError(400, "username is required.");
  }

  const user = await User.findOne({ userName });

  if (!user) {
    // console.log("user not found")
    throw new ApiError(404, "User not exsist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log("validating-debug:", isPasswordValid);
  if (!isPasswordValid) {
    console.log("passwordwa incorrect:", password)
    throw new ApiError(401, "Password incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, Cookie_options)
    .cookie("refreshToken", refreshToken, Cookie_options)
    .json(
      new ApiResponse(
        200,
        {
          user: accessToken,
          refreshToken,
        },
        "User logged in successfully!"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {

  const userId = req.user?._id;

  await User.findByIdAndUpdate(userId, {
    refreshToken: null,
  });

  return res
    .status(200)
    .clearCookie("accessToken", Cookie_options)
    .clearCookie("refreshToken", Cookie_options)
    .json(new ApiResponse(200, {}, "user loged out!"));
});

export { registerUser, loginUser, logoutUser };
 