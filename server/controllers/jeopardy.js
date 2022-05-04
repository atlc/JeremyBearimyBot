import axios from "axios";
import Query from "../database/index.js";

const removeHTML = str => {
    return str.replace(/<[^>]*>/g, "");
};

const capitalCase = str => {
    const words = str.split(" ");
    return words.map(word => word[0].toUpperCase() + word.substring(1)).join(" ");
};

const COMMONS = [
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "i",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
    "what",
    "so",
    "up",
    "out",
    "if",
    "about",
    "who",
    "get",
    "which",
    "go",
    "me"
];

const hasMatches = (answer, guess) => {
    const apiWords = answer
        .toLowerCase()
        .split(" ")
        .map(word => word.replace(/\W/g, ""))
        .filter(word => !COMMONS.includes(word));

    const userWords = guess
        .toLowerCase()
        .split(" ")
        .map(word => word.replace(/\W/g, ""))
        .filter(word => !COMMONS.includes(word));

    const matches = [];
    for (const guess of userWords) {
        if (apiWords.includes(guess)) matches.push(guess);
    }

    const weight = (100 * (matches.length / userWords.length)).toFixed(2) + "%";

    console.log({ apiWords, userWords, matches, weight });

    return !!matches.length;
};

export const jeopardy = async message => {
    try {
        if (message.author.username === "CrappyReactionRoles") return;

        const { question, answer, value, category, id } = (await axios.get("https://jservice.io/api/random")).data[0];

        await Query("INSERT INTO Clues SET ?", [{ id, answer: answer || "No Answer Provided", question: question || "No Question Provided", value: value || 420.69 }]);

        message.reply(
            `**${capitalCase(category.title)}**, **$${value?.toLocaleString() || "420.69"}**\n\n${removeHTML(
                question
            )}\n\nProvide an answer by stating ***!answer ${id} What is YourAnswerHere BottomText***. If unsuccessful, you may say ***!giveup ${id}*** to get the answer.`
        );
    } catch (error) {
        console.log(error.message);
    }
};

const badReplies = [
    "https://giphy.com/gifs/jeopardy-alex-trebek-KZYkfv4hxYk593RwRy",
    "https://giphy.com/gifs/jeopardy-dW0zrWnbtiPC1yaODM",
    "https://giphy.com/gifs/jeopardy--alex-trebek-DCQgmZooPrlDaaaX5m",
    "https://giphy.com/gifs/jeopardy--alex-trebek-8m5kAYnhmW7S7iLcAw",
    "https://giphy.com/gifs/jeopardy-gM0Ib2YHs68tfMisDc",
    "https://giphy.com/gifs/jeopardy-alex-trebek-QBSi1K0yOp1WDGyUFZ",
    "https://giphy.com/gifs/jeopardy-alex-trebek-H8FNhDLSI2IFrkvBzk",
    "https://giphy.com/gifs/jeopardy-alex-trebek-H8FNhDLSI2IFrkvBzk",
    "https://giphy.com/gifs/snl-saturday-night-live-will-ferrell-3o72wEFZZJGu1FcF3i",
    "https://giphy.com/gifs/snl-saturday-night-live-will-ferrell-xT8pe8XNxplioZnCuc",
    "https://giphy.com/gifs/snl-jeopardy-black-cyQ9PLf3mkNHO",
    "https://giphy.com/gifs/snl-saturday-night-live-nice-fV2nYFD3akDuTUgVhy"
];

const goodReplies = [
    "https://giphy.com/gifs/jeopardy--alex-trebek-1Be3hETov67HinhAQ8",
    "https://giphy.com/gifs/jeopardy--alex-trebek-BcIfjLfWjZQawf1QR7",
    "https://giphy.com/gifs/jeopardy-football-alex-trebek-KfSUEbdncm6k8gCIBr",
    "https://giphy.com/gifs/jeopardy--alex-trebek-C9EdMKeLbb80dv4OVI",
    "https://giphy.com/gifs/jeopardy--alex-trebek-1Be3hETov67HinhAQ8",
    "https://giphy.com/gifs/jeopardy--alex-trebek-BcIfjLfWjZQawf1QR7",
    "https://giphy.com/gifs/jeopardy--alex-trebek-1kdSvr6X3hGLjt7Z3u",
    "https://giphy.com/gifs/jeopardy--alex-trebek-fLstPMMZA2upKXScA1",
    "https://giphy.com/gifs/justin-correct-thats-it-keenen-thompson-26FPnsRww5DbqoPuM",
    "https://giphy.com/gifs/work-somebody-obscure-XwGVf8gQqt5rG",
    "https://giphy.com/gifs/snl-imgflip-FHsud3VVwaLgk"
];

export const getAnswer = async message => {
    try {
        if (message.author.username === "CrappyReactionRoles") return;

        const messageID = message.content.split(" ")[1];
        const [clue] = await Query("SELECT * FROM Clues WHERE id=?", [messageID]);

        if (clue) {
            const user_answer = message.content.toLowerCase();

            if (user_answer.includes("!giveup")) {
                message.reply(`The answer to ${clue.question}:\n\n*${clue.answer}*`);
                return;
            }

            if (hasMatches(clue.answer, user_answer)) {
                message.reply(goodReplies[Math.floor(Math.random() * goodReplies.length)]);
            } else {
                message.reply(badReplies[Math.floor(Math.random() * badReplies.length)]);
            }
        } else {
            message.reply("Sorry, no clue with that ID was found (or Andrew broke something again)");
        }
    } catch (error) {
        console.log(error);
        message.reply(`ATLC broke something, y'all @ him and tell him to check the logs`);
    }
};
