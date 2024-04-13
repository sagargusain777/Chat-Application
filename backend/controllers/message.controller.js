import { Conversation } from "../models/conversation.models.js";
import { Message } from "../models/message.models.js";
export const sendMessage = async (req, res) => {
  try {
    //Extracting message and receiverId from request body and request params
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    //Checking if conversation already exists between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Conversation does not exist
    //Creating a new conversation between sender and receiver
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    //Creating a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    //Adding message  id  to conversation
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    //Saving the message and conversation in the database
    await Promise.all([newMessage.save(), conversation.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(` Error in sendMessage controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
