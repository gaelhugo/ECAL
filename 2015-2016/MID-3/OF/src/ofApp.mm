#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    ofBackground(0);
     //ofEnableAntiAliasing();
    // ofEnableSmoothing();
    medusaNbr = 15;
    // Now parse the JSON
    bool parsingSuccessful = json.open("json/medusa.json");
    
    if (parsingSuccessful)
    {
       // ofLogNotice("ofApp::setup") << json.getRawString();
        texture.loadImage(json["meta"]["image"].asString());
        
        //create all balls and store it
        for(int i=0;i<medusaNbr;i++){
            float posx = ofRandomWidth();
            float posy = ofRandomHeight();
            balls.push_back(Ball(texture,json,posx,posy,40));
        }
    
    }
    else
    {
        ofLogError("ofApp::setup")  << "Failed to parse JSON" << endl;
    }

}

//--------------------------------------------------------------
void ofApp::update(){
    for(Ball &b:balls) b.update();
}

//--------------------------------------------------------------
void ofApp::draw(){
    
    for(Ball &b:balls){
        b.verifyDrag(ptLst);
        b.draw();
        if(b.dragging){
            b.calculSpeedValue(b.x, b.y);
        }
    }
}

//--------------------------------------------------------------
void ofApp::exit(){

}

//--------------------------------------------------------------
void ofApp::touchDown(ofTouchEventArgs & touch){
    
    ofPoint pt(touch.x, touch.y);
    //ptLst.insert(std::pair<int,ofPoint>( touch.id, pt) );
    ptLst[touch.id] = pt;

    for(Ball &b:balls){b.checkTouch(ptLst);}
}

//--------------------------------------------------------------
void ofApp::touchMoved(ofTouchEventArgs & touch){
    ofPoint pt(touch.x, touch.y);
    ptLst[touch.id] = pt;
}

//--------------------------------------------------------------
void ofApp::touchUp(ofTouchEventArgs & touch){
     for(Ball &b:balls){
         if(b.ID == touch.id){b.stopDragging();}
     }
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
