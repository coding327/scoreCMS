import { RouteRecordRaw } from "vue-router"

const layoutRoutes: RouteRecordRaw[] = [
  {
    path: "/layout",
    name: "layout",
    component: () => import("./Layout.vue"),
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import("../home/Home.vue")
      },
      {
        path: 'score/myscore',
        name: 'scoreMyScore',
        component: () => import("../score/MyScore.vue")
      },
      {
        path: 'score/commitscore',
        name: 'scoreCommitScore',
        component: () => import("../score/CommitScore.vue")
      },
      {
        path: 'score/analyze',
        name: 'scoreAnalyze',
        component: () => import("../score/Analyze.vue")
      },
      {
        path: 'score/grade',
        name: 'scoreGrade',
        component: () => import("../score/Grade.vue")
      },
      {
        path: 'anno/annolist',
        name: 'annoAnnoList',
        component: () => import("../anno/AnnoList.vue")
      },
      {
        path: 'anno/sendanno',
        name: 'annoSendAnno',
        component: () => import("../anno/SendAnno.vue")
      },
      {
        path: 'education/classm',
        name: 'educationClassM',
        component: () => import("../education/ClassM.vue")
      },
      {
        path: 'education/subjectm',
        name: 'educationSubjectM',
        component: () => import("../education/SubjectM.vue")
      },
      {
        path: 'education/studentm',
        name: 'educationStudentM',
        component: () => import("../education/StudentM.vue")
      },
      {
        path: 'me',
        name: 'me',
        component: () => import("../me/Me.vue")
      },
    ]
  }
]

export default layoutRoutes