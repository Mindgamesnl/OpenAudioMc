import {Card} from "../../card/Card";

export function handleUpdateCard(openAudioMc, data) {
    const cardData = JSON.parse(data.serializedCard);
    new Card().replaceWithJson(data.id, cardData);
}