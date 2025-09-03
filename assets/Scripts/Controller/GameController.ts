import { _decorator, Component, Node } from 'cc';
import { Card } from '../Object/Card';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Card)
    listCardDealer: Card[] = [];
    @property(Card)
    listCardPlayer: Card[] = [];
    @property(Card)
    listCommunityCard: Card[] = [];

    indexStep: number = 0; // 0: dealer, 1: player, 2: flop, 3: turn, 4: river

    onHandlePlay() {
        this.showAllCardPlayer();
    }
    onHandleCheck() {

    }
    onHandleX3(){
        
    }






    showAllCardPlayer() {
        this.listCardPlayer.forEach(card => {
            card.showCard();
        });
    }
}


