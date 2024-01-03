import STATUS_CODE from "../constants/statusCodes.js";
import { readBankFromFile , writeBankToFile } from "../models/bankModel.js";
import { v4 as uuidv4 } from "uuid";

// @des      Get all the users
// @route    GET /api/v1/bank
// @access   Public
export const getAllUsers = async (req, res, next) => {
  // res.send("fady");
  try {
    const users = readBankFromFile();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

// @des      Get a single user
// @route    GET /api/v1/users/:id
// @access   Public
export const getUserById = async (req, res, next) => {
  try {
    const users = readBankFromFile();
    const user= users.find((u) => u.id === req.params.id);
    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User was not found");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

// @des      Create a new user
// @route    POST /api/v1/users
// @access   Public
export const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, cashAmount , creditAmount, creditLimit } = req.body;
    if (!firstName|| !lastName|| !cashAmount || !creditAmount || !creditLimit ) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error(
        "All fields (firstName, lastName, cashAmount , creditAmount, creditLimit) are required"
      );
    }

    const users = readBankFromFile();
    if (users.some((u) => u.firstName === firstName && u.lastName === lastName)) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("A user with a same name and lastName  already exists");
    }

    const newUser = { id: uuidv4(), firstName, lastName, cashAmount , creditAmount, creditLimit};
    users.push(newUser);
    writeBankToFile(users);
    res.status(STATUS_CODE.CREATED).send(newUser);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST);
    next(error);
  }
};

// @des      Update a user
// @route    PUT /api/v1/users/:id
// @access   Public
export const updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, cashAmount , creditAmount, creditLimit } = req.body;
    if (!firstName|| !lastName|| !cashAmount || !creditAmount || !creditLimit ) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error(
        "All fields (firstName, lastName, cashAmount , creditAmount, creditLimit) are required"
      );
    }
    const users = readBankFromFile();
    const index = users.findIndex(u=> u.id === req.params.id)
    if(index === -1){
        res.status(STATUS_CODE.NOT_FOUND)
        throw new Error("Userwas not found!")
    }
    const lastIndex = users.findLastIndex(u => u.firstName === firstName && u.lastName === lastName)
    if(lastIndex != -1 && lastIndex != index){
        res.status(STATUS_CODE.BAD_REQUEST)
        throw new Error("Cannot edit user")
    }

    const updatedUsers= {...users[index],firstName, lastName, cashAmount , creditAmount, creditLimit}
    users[index] = updatedUsers;
    writeBankToFile(users)
    res.send(updatedUsers);
  } catch (error) {
    next(error)
  }
};

// @des      delete a user
// @route    DELETE /api/v1/users/:id
// @access   Public
 export const deleteUser = async (req, res, next) => {
  try {
    const users = readBankFromFile();
    const newUsersList = users.filter((user) => user.id !== req.params.id);

    if (newUsersList.length === users.length) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User was not found");
    }
    writeBankToFile(newUsersList);
    res
      .status(STATUS_CODE.OK)
      .send(`User with the id of ${req.params.id} was deleted!`);
  } catch (error) {
    // next(error); 
    console.log("error");
  }
};


