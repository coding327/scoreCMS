import { RouteRecordRaw } from "vue-router";

const layoutRoutes: RouteRecordRaw[] = [
  {
    path: "/layout",
    name: "layout",
    component: () => import("./Layout.vue"),
    redirect: "/layout/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../home/Home.vue"),
      },
      {
        path: "anno/annolist",
        name: "annoAnnoList",
        component: () => import("../anno/AnnoList.vue"),
      },
      {
        path: "anno/sendanno",
        name: "annoSendAnno",
        component: () => import("../anno/SendAnno.vue"),
      },
      {
        path: "/anno/update/:id",
        name: "anno-update",
        component: () => import("@/views/Anno/AnnoUpdate.vue"),
      },
      {
        path: "education/classm",
        name: "educationClassM",
        component: () => import("../education/ClassM.vue"),
      },
      {
        path: "education/subjectm",
        name: "educationSubjectM",
        component: () => import("../education/SubjectM.vue"),
      },
      {
        path: "education/studentm",
        name: "educationStudentM",
        component: () => import("../education/StudentM.vue"),
      },
      {
        path: "me",
        name: "me",
        component: () => import("../me/Me.vue"),
      },
      // 用户管理
      {
        path: "user/add",
        name: "user-add",
        component: () => import("@/views/user/UserAdd.vue"),
      },
      {
        path: "user/list",
        name: "user-list",
        component: () => import("@/views/user/UserList.vue"),
      },

      // 角色管理
      {
        path: "role/list",
        name: "role-list",
        component: () => import("@/views/role/RoleList.vue"),
      },
      {
        path: "role/data",
        name: "role-data",
        component: () => import("@/views/role/RoleData.vue"),
      },

      // 意见管理
      {
        path: "advise/add",
        name: "advise-add",
        component: () => import("@/views/advise/AdviseAdd.vue"),
      },
      {
        path: "advise/list",
        name: "advise-list",
        component: () => import("@/views/advise/AdviseList.vue"),
      },
      {
        path: "advise/update/:id",
        name: "advise-update",
        component: () => import("@/views/advise/AdviseUpdate.vue"),
      },
      {
        path: "advise/detail/:id",
        name: "advise-detail",
        component: () => import("@/views/advise/AdviseDetail.vue"),
      },
      // 成绩管理
      {
        path: "grade/add",
        name: "grade-add",
        component: () => import("@/views/grade/AddGrade.vue"),
      },
      {
        path: "grade/list",
        name: "grade-list",
        component: () => import("@/views/grade/GradeList.vue"),
      },
      {
        path: "grade/data",
        name: "grade-data",
        component: () => import("@/views/grade/GradeData.vue"),
      },
      {
        path: "grade/mygrade",
        name: "grade-my",
        component: () => import("@/views/grade/MyGrade.vue"),
      },
    ],
  },
];

export default layoutRoutes;
