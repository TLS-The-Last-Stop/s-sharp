<a name="readme-top"></a>

<div align="center">
  
![image](https://github.com/user-attachments/assets/38fbe2a0-5050-47a5-ae0e-3af4399d7213)
  <h3><b>학생 학습 정리 플랫폼 S-S#arp</b></h3> 

</div>

## 🔗 Link
- <a href="https://www.canva.com/design/DAGS2T9F7xs/V0sPmxokNoIUpT2k5FpaYg/view?utm_content=DAGS2T9F7xs&utm_campaign=designshare&utm_medium=link&utm_source=editor#1" target="_blank">S-S#arp 최종발표/영상 및 자료 ⭕</a>
- <a href="https://sulfuric-alphabet-1bc.notion.site/TLS-The-Last-Stop-11b72fa24262806caca5fc2e57cbb1a4?pvs=4" target="_blank">S-S#arp Notion 📝</a>

<br>

# 📗 목차

- [📢 프로젝트 소개](#about-project)
  - [👨‍👩‍👦‍👦 웹개발팀 소개](#authors)
  - [🛠 개발 환경](#built-with)
  - [📖 API 명세](#api)
  - [📂 프로젝트 구조](#project)
  - [🔑 주요 기능](#key-features)
  - [🚀 시연영상](#live-demo)
- [💻 시작하기](#getting-started)
  - [준비 사항](#prerequisites)
  - [설치](#installation)

- [🔭 향후 계획](#future-features)
- [🙏 소감](#acknowledgements)

<br>

## 📢 프로젝트 소개 <a name="about-project"></a>

**S-S#arp**는 학생들이 학습 내용을 정리하고 공유할 수 있는 플랫폼입니다.  
이 플랫폼은 사용자가 자신만의 학습 자료를 쉽게 등록하고, 다른 사용자와 소통할 수 있는 기능을 제공합니다.  
주요 기능으로는 다음과 같은 것들이 포함되어 있습니다:  
1. 학습 정리 습관 형성  
2. 지식 공유 및 협업  
3. 개별 학습 기록 저장  
4. 안전한 커뮤니티 형성  

**S-S#arp**의 핵심 목표는 학생들이 서로의 학습 경험을 공유하고, 효율적으로 공부할 수 있는 안전한 커뮤니티를 형성하는 것입니다.

**S-S#arp** is a platform for students to organize and share their learning experiences.  
This platform allows users to easily register their own study materials and communicate with other users.  
Key features include:  
1. Formation of study organization habits  
2. Knowledge sharing and collaboration  
3. Individual learning record storage  
4. Creation of a safe community  

The core goal of **S-S#arp** is to create a safe community where students can share their learning experiences and study effectively together.


![main](https://github.com/user-attachments/assets/d5fffa62-a17e-407e-9b97-5aa3e21c0655)  

<br>

## 👨‍👩‍👦‍👦 웹개발팀 소개 <a name="authors"></a>

|      김혁진       |          👑김다은         |       한유리         |       조요한        |       이수완        |
| :----------------: | :----------------------: | :-----------------: | :----------------: | :----------------: |
|   ![image](https://github.com/user-attachments/assets/e1d65a46-b877-4d09-80b0-7d7815923d99)   |   ![image](https://github.com/user-attachments/assets/cfd32868-abec-4ee4-9d79-841779c844e8)  | ![image](https://github.com/user-attachments/assets/dd09b103-1d03-431d-8e13-da7af174fced) | ![image](https://github.com/user-attachments/assets/a0b7ed59-bb5d-4595-b43c-cbdb499a0e31) |   ![image](https://github.com/user-attachments/assets/b99e243e-19ec-4c9b-9bda-450b075a606f)    |
|   [@hyoekjin](https://github.com/HS-hyeokjin)   |    [@daeun](https://github.com/kde0707)  | [@YUL554](https://github.com/YUL554)  | [@koreajohn](https://github.com/koreajohn) | [@ssuwwann](https://github.com/ssuwwann) |
| 천재교육 풀스택6기 | 천재교육 풀스택6기 | 천재교육 풀스택6기 | 천재교육 풀스택6기 | 천재교육 풀스택6기 |

<br>

## 🛠 개발 환경 <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://vitejs.dev/">Vite</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://spring.io/projects/spring-boot">Spring Boot</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://mariadb.org/">MariaDB</a></li>
    <li><a href="https://aws.amazon.com/s3/">Amazon S3</a></li>
  </ul>
</details>

![image](https://github.com/user-attachments/assets/a57ffb90-33a6-462a-83be-4c64d6a612b3)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br>

## 📖 API 명세  <a name="api"></a>

### <a href="https://sulfuric-alphabet-1bc.notion.site/API-11b72fa24262810eb944fba317dd3cab?pvs=4" target="_blank"> 🌐 </a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br>

## 📂 프로젝트 구조 <a name="project"></a>
```
ssharp/
├── .idea
├── backend/
│   ├── .gradle
│   ├── ssharp/
│   │   ├── build/
│   │   ├── gradle/
│   │   ├── src/
│   │   │   └── java/
│   │   │       └── com/
│   │   │           └── tls/
│   │   │               └── ssharp/
│   │   │                   ├── SsharpApplication.java
│   │   │                   ├── auth/
│   │   │                   ├── bookmark/
│   │   │                   ├── config/
│   │   │                   ├── faq/
│   │   │                   ├── post/
│   │   │                   ├── report/
│   │   │                   ├── review/
│   │   │                   ├── search/
│   │   │                   ├── security/
│   │   │                   ├── user/
│   │   │                   └── util/
│   │   ├── build.gradle
│   │   ├── gradlew
│   │   ├── gradlew.bat
│   │   ├── HELP.md
│   │   └── settings.gradle
│   └── test/
│       └── java/
│           └── com/
│               └── tls/
│                   └── ssharp/
│                       └── SsharpApplicationTests.java
└── frontend/
    └── ssharp/
        ├── node_modules/
        ├── public/
        ├── src/
        │   ├── admin/
        │   │   ├── api/
        │   │   ├── components/
        │   │   ├── data/
        │   │   └── layout/
        │   ├── app/
        │   ├── common/
        │   │   ├── footer/
        │   │   └── header/
        │   ├── components/
        │   │   ├── auth/
        │   │   ├── layouts/
        │   │   └── pages/
        │   │       ├── blog/
        │   │       ├── bookmark/
        │   │       └── share/
        │   ├── data/
        │   ├── utils/
        │   ├── App.css
        │   ├── App.jsx
        │   ├── index.css
        │   └── index.jsx
        ├── .env
        ├── index.html
        ├── package.json
        ├── package-lock.json
        ├── README.md
        ├── vite.config.mjs
        └── yarn.lock
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br>


## 🔑 주요 기능 <a name="key-features"></a>

- **로그인 및 회원가입**: JWT 기반 인증 및 OAuth 소셜 로그인
- **실시간 알림**: STOMP와 WebSocket을 활용한 실시간 알림 기능
- **학습 자료 공유**: URL을 통한 간편한 자료 공유
- **검색 기능**: 태그 및 카테고리 기반 검색
- **리뷰 및 평가**: 학습 자료에 대한 피드백 시스템
- **콘텐츠 관리**: CRUD 기능 및 버전 관리
- **관리자 기능**: 플랫폼 운영을 위한 관리 도구

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br>

## 🚀 시연영상 <a name="live-demo"></a>

|  영상 |
| :-------------------------------------------: |
|  <a href="https://youtu.be/XoM0mps1Iw0" target="_blank">![시연영상](https://github.com/user-attachments/assets/bd15ea8b-ca74-4a8a-b37f-118c9239e9d2) </a> |



<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br>

## 💻 시작하기 <a name="getting-started"></a>

### 준비 사항 <a name="prerequisites"></a>

이 프로젝트를 실행하기 위해 필요한 것들:

```sh
 npm (Node Package Manager)
 Java Development Kit (JDK) 11 이상
 MariaDB
```

### 설치 <a name="installation"></a>
- 리포지토리 클론하기
```sh
git clone https://github.com/your_username/student-learning-platform.git
```
- 프론트엔드 의존성 설치
```sh
Copycd frontend
npm install
```
- 백엔드 의존성 설치 (Maven 사용)
```sh
Copycd backend
mvn install
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br>

## 🔭 향후 계획 <a name="future-features"></a>

- 모바일 앱 개발: iOS 및 Android 플랫폼 지원
- AI 기반 학습 추천 시스템: 개인화된 학습 자료 추천
- 화상 회의 통합: 실시간 온라인 스터디 그룹 지원

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br>

## 🙏 소감 <a name="acknowledgements"></a>

### 👶 김다은(팀장) - 알림, 공유, 북마크
알림 북마크 기능 개발을 통해 사용자 경험을 한 단계 향상시킬 수 있어 보람찼습니다. 이 과정에서 프론트엔드와 백엔드 기술을 통합하는 실질적인 경험을 쌓았고, 특히 사용자 인터페이스 최적화에 대해 많이 배웠습니다. 

### 김혁진 - 로그인, 회원가입
처음에는 복잡해 보이던 과정들이 하나씩 해결되면서 전체 시스템이 모습을 갖추어 가는 것을 보니 뿌듯합니다. 특히 OAuth 구현 과정에서 보안 관련 세부사항들을 익히는 데 시간이 걸렸지만, 이를 통해 인증 시스템에 대한 이해도가 한층 깊어졌습니다. 여러 소셜 플랫폼의 API를 연동하면서 각 플랫폼의 특성과 차이점을 배울 수 있었습니다.

### 한유리 - 게시글, 태그
게시글의 메타데이터(작성자, 작성 시간 등)를 어떻게 효율적으로 저장하고 관리할지 결정하는 과정이 흥미로웠습니다. 태그 기능은 태그와 게시글 간의 다대다 관계를 효과적으로 관리해야 했고 이 과정에서 관계형 데이터베이스의 장점을 실감했습니다. 동시에 NoSQL의 필요성도 고민하게 되었습니다.

### 조요한 - 리뷰, 평가
처음에는 단순해 보였던 기능이 실제로는 많은 고려사항이 필요했습니다. 사용자 경험을 고려한 UI 설계부터 시작해, 데이터베이스 모델링,등 기술적으로 도전적인 부분이 많았습니다.  앞으로 리뷰 분석을 통한 인사이트 도출, 개인화된 리뷰 추천 등으로 기능을 더욱 발전시키고 싶습니다.

### 이수완 - 신고, 관리자, FAQ
신고의 조회수 구현을 통해 레디스라는 새로운 기술을 사용해 보았으며 보이는 화면 또한 react를 통해 구현해 새로운 기술을 공부하는 시간이 되어서 좋았지만 습득하는 데 시간이 걸려 완성도 있게 프로젝트를 마무리하지 못하여 아쉬움이 남기도 하였습니다. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<p align="right">(<a href="#readme-top">back to top</a>)</p>
