import axios from "axios";

const removeHTML = str => {
    return str.replace(/<[^>]*>/g, "");
};

const capitalCase = str => {
    const words = str.split(" ");
    console.log({ words, chopped: words.map(word => word[0].toUpperCase() + word.substring(1)).join(" ") });
    return words.map(word => word[0].toUpperCase() + word.substring(1)).join(" ");
};

const jeopardy = async message => {
    try {
        const { question, answer, value, category } = (await axios.get("https://jservice.io/api/random")).data[0];
        console.log({ question, answer, value, category });
        message.reply(
            `**${capitalCase(category.title)}**, **$${value?.toLocaleString() || "420.69"}**\n\n${removeHTML(question) || "**No Answer Provided**"}\n\n||${
                removeHTML(answer) || "**No Question Provided**"
            }||`
        );
    } catch (error) {
        console.log(error.message);
    }
};

export default jeopardy;
