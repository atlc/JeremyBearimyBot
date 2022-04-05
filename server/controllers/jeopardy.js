import axios from "axios";
import Query from "../database";

const removeHTML = str => {
    return str.replace(/<[^>]*>/g, "");
};

const capitalCase = str => {
    const words = str.split(" ");
    console.log({ words, chopped: words.map(word => word[0].toUpperCase() + word.substring(1)).join(" ") });
    return words.map(word => word[0].toUpperCase() + word.substring(1)).join(" ");
};

export const jeopardy = async message => {
    try {
        const { question, answer, value, category, id } = (await axios.get("https://jservice.io/api/random")).data[0];

        await Query("INSERT INTO Clues SET ?", [{ id, answer: answer || "No Answer Provided", question: question || "No Question Provided", value: value || 420.69 }]);

        message.reply(
            `**${capitalCase(category.title)}**, **$${value?.toLocaleString() || "420.69"}**\n\n${removeHTML(question)}\n\nProvide an answer by stating *!answer ${id} Your Answer Here BottomText*`
        );
    } catch (error) {
        console.log(error.message);
    }
};

const badReplies = [
    "https://giphy.com/gifs/jeopardy-alex-trebek-KZYkfv4hxYk593RwRy",
    "https://giphy.com/gifs/jeopardy-dW0zrWnbtiPC1yaODM",
    "https://giphy.com/gifs/jeopardy--alex-trebek-DCQgmZooPrlDaaaX5m",
    "https://giphy.com/gifs/jeopardy--alex-trebek-8m5kAYnhmW7S7iLcAw"
];

const goodReplies = [
    "https://giphy.com/gifs/jeopardy--alex-trebek-1Be3hETov67HinhAQ8",
    "https://giphy.com/gifs/jeopardy-alex-trebek-QBSi1K0yOp1WDGyUFZ",
    "https://giphy.com/gifs/jeopardy--alex-trebek-BcIfjLfWjZQawf1QR7"
];

export const getAnswer = async message => {
    try {
        const messageID = message.content.split(" ")[1];
        const [clue] = await Query("SELECT * FROM Clues WHERE id=?", [messageID]);

        if (message.content.toLowerCase().includes(clue.answer)) {
            message.reply(goodReplies[Math.floor(Math.random() * goodReplies.length)]);
        } else {
            message.reply(badReplies[Math.floor(Math.random() * badReplies.length)]);
        }
    } catch (error) {
        console.log(error);
        message.reply(`@ATLC Hey you fucked something up, check the logs`);
    }
};
