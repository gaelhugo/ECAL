#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    ofBackground(0);
    nbrBall  = 200;
    for(int i = 0;i<nbrBall;i++){
        Ball myBall = Ball( ofRandomWidth(),ofRandomHeight(),ofRandom(5, 15) );
        allBalls.push_back(myBall);
    }
}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
/*
void ofApp::draw(){
    for(int i = 0;i<allBalls.size();i++){
        
        allBalls[i].display();
    }
}
 */
void ofApp::draw(){
    
        for(int i = 0;i<allBalls.size();i++){
            allBalls[i].display();
            allBalls[i].move();
            
        }
   
    
    
}

//--------------------------------------------------------------
void ofApp::exit(){

}

//--------------------------------------------------------------
void ofApp::touchDown(ofTouchEventArgs & touch){

}

//--------------------------------------------------------------
void ofApp::touchMoved(ofTouchEventArgs & touch){

}

//--------------------------------------------------------------
void ofApp::touchUp(ofTouchEventArgs & touch){

}

//--------------------------------------------------------------
void ofApp::touchDoubleTap(ofTouchEventArgs & touch){

}

//--------------------------------------------------------------
void ofApp::touchCancelled(ofTouchEventArgs & touch){
    
}

//--------------------------------------------------------------
void ofApp::lostFocus(){

}

//--------------------------------------------------------------
void ofApp::gotFocus(){

}

//--------------------------------------------------------------
void ofApp::gotMemoryWarning(){

}

//--------------------------------------------------------------
void ofApp::deviceOrientationChanged(int newOrientation){

}
