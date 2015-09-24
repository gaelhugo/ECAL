//
//  Ball.h
//  EcalDemo
//
//  Created by Gael Hugo on 23.09.15.
//
//
#pragma once

#include <stdio.h>
#include "ofMain.h"
#include "ofxJSON.h"

class Ball{
public:
    Ball();
    Ball(ofImage _texture,ofxJSONElement _json,float _x, float _y, int _radius);
    
    void setup();
    void update();
    void draw();
    void verifyDrag(map<int,ofPoint>);
    void calculSpeedValue(float _x,float _y);
    void checkTouch(map<int,ofPoint>);
    void stopDragging();
    
    float x,y;
    int radius;
    ofImage texture;
    ofxJSONElement json;
    
    float offsetX,offsetY,oldX,oldY,newX,newY,xspeed,yspeed,friction,scale,scaleFactor;
    bool dragging;
    int ID;
    int counter;
    
    
    
};

