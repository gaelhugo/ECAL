//
//  Ball.h
//  exemple
//
//  Created by Gaël Hugo on 25.09.15.
//
//
#pragma once

#include <stdio.h>
#include "ofMain.h"



class Ball{
    public:
    
    Ball();
    Ball(float posx,float posy, float rayon);
    
    void display();
    void checkTouch();
    void move();
    
    float x;
    float y;
    float rayon;
    
    float speedX;
    float speedY;
    float friction;
    
    
    
};