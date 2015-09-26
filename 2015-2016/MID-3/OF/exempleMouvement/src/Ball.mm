//
//  Ball.cpp
//  exemple
//
//  Created by Gaël Hugo on 25.09.15.
//
//

#include "Ball.h"

Ball::Ball(){}
Ball::Ball(float posx, float posy, float r){
    x = posx;
    y = posy;
    rayon = r;
    
    speedX = ofRandom(5);
    speedY = ofRandom(5);
    friction = 0.98;
}

void Ball::display(){
    ofSetColor(255, 255, 255);
    ofFill();
    ofCircle(x, y, rayon);
}

void Ball::move(){
    if(x>ofGetWidth()+rayon){
        x = -rayon;
    }else{
        x+=speedX;
    }
    
    if(y>ofGetHeight()+rayon){
        y = -rayon;
    }else{
        y+=speedY;
    }
}

void Ball::checkTouch(){}