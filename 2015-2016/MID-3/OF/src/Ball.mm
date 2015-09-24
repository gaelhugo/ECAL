//
//  Ball.mm
//  EcalDemo
//
//  Created by Gael Hugo on 23.09.15.
//
//

#include "Ball.h"

Ball::Ball(){}
Ball::Ball(ofImage _texture,ofxJSONElement _json, float _x, float _y, int _radius){
    x = _x;
    y = _y;
    texture = _texture;
    json = _json;
    radius = _radius;
    counter = 0;
    
    oldX = 0;
    oldY = 0;
    newX = 0;
    newY = 0;
    xspeed = 0;
    yspeed = 0;
    friction = 0.98;
  
}

void Ball::setup(){}

void Ball::update(){
  //  ofLogNotice("frames count")<<json["frames"].size();
    if(counter>=json["frames"].size()-1){counter=0;}else{counter++;}
}

void Ball::draw(){
   
    ofSetColor(255,255,255);
    ofFill();
    ofCircle(x, y, radius);
     // ofLogNotice("frames count")<<json["frames"].size();
    //draw from JSON
    int sx  = json["frames"][counter]["frame"]["x"].asInt();
    int sy  = json["frames"][counter]["frame"]["y"].asInt();
    int w   = json["frames"][counter]["frame"]["w"].asInt();
    int h   = json["frames"][counter]["frame"]["h"].asInt();
    texture.drawSubsection(x-w/2, y-h/2, w, h, sx, sy);
}


void Ball::stopDragging(){
    dragging = false;
    ID = NULL;
}

void Ball::calculSpeedValue(float _x,float _y){
    newX = _x;
    newY = _y;
    xspeed = newX-oldX;
    yspeed = newY-oldY;
    oldX = newX;
    oldY = newY;
    
    cout<<"calculate speed "<<xspeed<<endl;
}

void Ball::verifyDrag(map<int,ofPoint> touch){
    if(dragging){
        
        for(map<int,ofPoint>::iterator it = touch.begin(); it != touch.end(); ++it) {
            if(it->first == ID && dragging){
                x = it->second.x+offsetX;
                y = it->second.y+offsetY;
            }
        }
        
       
    }else{
        x+= xspeed;
        y+= yspeed;
        
        xspeed*=friction;
        yspeed*=friction;
        
        if(x<-radius){x = ofGetWidth()+radius;}
        if(x>ofGetWidth()+radius){x = -radius;}
        if(y<-radius){y = ofGetHeight()+radius;}
        if(y>ofGetHeight()+radius){y = -radius;}
        
    }
}

void Ball::checkTouch(map<int,ofPoint> touch){
    //cout<<"check touch"<<endl;
    for(map<int,ofPoint>::iterator it = touch.begin(); it != touch.end(); ++it) {
       // cout <<"id: "<< it->first << " / posx: "<<it->second.x<<" / posy: "<<it->second.y<<" / x: "<<x<<" / y: "<<y<<endl;
        offsetX = x - it->second.x;
        offsetY = y - it->second.y;
        float dist = sqrt(offsetX * offsetX + offsetY * offsetY);
        if(dist<radius){
            dragging = true;
            ID = it->first;
            cout<<"touched"<<endl;
            break;
        }else{
            dragging = false;
        }
    }
}


