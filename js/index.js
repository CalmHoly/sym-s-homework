function $(id) {
  return document.getElementById(id);
}
// 重置
$("resetButton").onclick = function () {
  location.reload()
};
// 闭合
$("closeButton").onclick = function () {
  ctx.closePath();
  ctx.stroke();
};
// 添加坐标
$("addDot").onclick = function () {
  let dotValue = $("dotInput").value;
  // 校验
  if (!dotValue) {
    alert("请输入坐标");
    return;
  }
  let reg = /\d+,\d+/;
  if (!reg.test(dotValue)) {
    alert("请输入正确的坐标，格式：数字+英文逗号+数字");
    return;
  }
  reg = null;
  // 校验完毕
  let leftDot = dotValue.split(",")[0] * MAGNIFICATION;
  let rightDot = dotValue.split(",")[1] * MAGNIFICATION;
  dotValue = null;
  // 初始点
  if ($("addDot").innerText === "初始坐标") {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    // 起点
    ctx.moveTo(leftDot, rightDot);
    $("addDot").innerText = "添加坐标";
    return;
  }

  // 添加点
  ctx.lineTo(leftDot, rightDot);
  ctx.stroke();
  leftDot = null;
  rightDot = null;
};
