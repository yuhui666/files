# WebRtc 实现音视频推拉流

## Demo

**参考项目**

- flutter 项目地址``Fltter`` ``Dart`` ``ios`` ``Android`` ``web`` ``JNI`` ``C++``<br>
  https://github.com/flutter-webrtc/flutter-webrtc-demo
- server 项目地址``go`` <br>
  https://github.com/flutter-webrtc/flutter-webrtc-server

## 样例1
```mermaid
graph LR
A[方形] 
B(圆角)
C{条件a}
D[结果1]
E[结果2]
F((圆形))
G[方形]
X[结果3]
 
 
A --实线--> B
B -.虚线.-> A
B --长直线----> G
B --> C
C ==> |粗实线| D
C -.无箭头虚线.- E
C --无箭头实线--- X
B --> F
```

