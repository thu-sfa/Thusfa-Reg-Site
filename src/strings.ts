const strings = {
  en: {
    title: "Tsinghua SFA Registration",
    welcome: "Welcome aboard!",
    register: "Register",
    redirecting: "Redirecting...",
    reload_admin: "Reload Admin",
    regview: {
      phone_required: "Phone is required",
      department_required: "Department is required",
      qq_required: "QQ is required",
      authenticate: "Authenticate",
      authenticate_hint:
        "We require authentication from {link} to validate your student identity.",
      tsinghua_git: "Tsinghua Git",
      register: "Register",
      information_hint:
        "The information collected will only be used for validating your identity and contacting you. Data will be kept safely on our server and will only be visible to management group of this association.",
      complete: "Complete",
      submit: "Submit",
      label: {
        name: "Name",
        email: "Email",
        stuid: "Student ID",
        phone: "Phone",
        department: "Department",
        qq: "QQ",
      },
      registered_already: "You have registered already.",
      registered_success: "You have registered successfully.",
      scan_qrcode:
        "Click the link or scan the QR Code below to join our QQ group.",
    },
    errorview: {
      internal_error: "Internal Server Error",
      internal_error_hint:
        "Oops, we encounter an error, please try again later.",
      session_not_found: "Session Not Found",
      session_not_found_hint:
        "Your request was sent with an incorrect session. This could usually be solved by trying again.",
      unauthorized: "Unauthorized",
      unauthorized_hint: "You are not authorized to access this page.",
      unknown_error: "Unknown Error",
      unknown_error_hint:
        "Oops, we encounter an unknown error, please try again later.",
      back: "Back to Home",
    },
    adminview: {
      validating: "Validating identity...",
      redirecting: "Redirecting to validation...",
    },
  },
  zh: {
    title: "清华大学学生科幻协会注册",
    welcome: "欢迎登舰！",
    register: "注册",
    redirecting: "正在重定向...",
    reload_admin: "刷新管理员列表",
    regview: {
      phone_required: "手机号码是必填项",
      department_required: "院系是必填项",
      qq_required: "QQ号码是必填项",
      authenticate: "认证",
      authenticate_hint: "我们需要从{link}获取您的学生身份信息。",
      tsinghua_git: "Tsinghua Git",
      register: "注册",
      information_hint:
        "我们只会使用您提供的信息来验证您的身份和联系您。数据将会安全地存储在我们的服务器上，并且只有本协会的管理成员可以查看。",
      complete: "完成",
      submit: "提交",
      label: {
        name: "姓名",
        email: "Email",
        stuid: "学号",
        phone: "手机号码",
        department: "院系",
        qq: "QQ",
      },
      registered_already: "您已经注册过了",
      registered_success: "注册成功",
      scan_qrcode: "点击按钮或扫描下方二维码加入我们的QQ群",
    },
    errorview: {
      internal_error: "内部服务器错误",
      internal_error_hint: "Oops，我们遇到了一个错误，请稍后再试。",
      session_not_found: "会话未找到",
      session_not_found_hint:
        "您的请求使用了一个错误的会话。这通常可以通过重试来解决。",
      unauthorized: "未授权",
      unauthorized_hint: "您没有权限访问该页面。",
      unknown_error: "未知错误",
      unknown_error_hint: "Oops，我们遇到了一个未知错误，请稍后再试。",
      back: "返回首页",
    },
    adminview: {
      validating: "正在验证身份...",
      redirecting: "正在重定向至验证页面...",
    },
  },
};

export default strings;
