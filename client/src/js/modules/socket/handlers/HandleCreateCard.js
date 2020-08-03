import {Card} from "../../card/Card";

export function handleCreateCard(openAudioMc, data) {
    const cardData = JSON.parse(data.serializedCard);
    new Card(cardData);
}