function $(id) {
  return document.getElementById(id);
}
function addDotText(leftDot, rightDot) {
  let box = document.getElementById("canvasBox");
  // 点
  let dotDiv = document.createElement("div");
  dotDiv.className = "dot-class";
  dotDiv.style.cssText = `top: ${rightDot - 2}px;left:${leftDot + 7}px;`;
  box.appendChild(dotDiv);
  // 数字
  let numberDiv = document.createElement("div");
  numberDiv.className = "dot-number-class";
  numberDiv.style.cssText = `top: ${rightDot - 17}px;left:${leftDot - 3}px;`;
  // 显示的y轴坐标需要再倒回来..
  numberDiv.innerText = `(${leftDot / MAGNIFICATION},${
    (-rightDot + canvas.height) / MAGNIFICATION
  })`;
  box.appendChild(numberDiv);
}
// 重置
$("resetButton").onclick = function () {
  location.reload();
};
// 闭合
$("closeButton").onclick = function () {
  ctx.closePath();
  ctx.stroke();
};
// 添加坐标
$("addDot").onclick = function () {
  // this.checkData();
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
  let leftDot = dotValue.split(",")[0] * MAGNIFICATION;
  let rightDot = dotValue.split(",")[1] * MAGNIFICATION;
  dotValue = null;
  // 坐标只能处于第一象限内
  if (leftDot < 0 || leftDot > canvas.width) {
    alert(`横坐标需大于0小于${canvas.width / 10}`);
    return;
  }
  if (rightDot < 0 || rightDot > canvas.height) {
    alert(`纵坐标需大于0小于${canvas.height / 10}`);
    return;
  }
  // y轴坐标颠倒
  rightDot = -rightDot + canvas.height;
  // 初始点
  if ($("addDot").innerText === "初始坐标") {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    // 起点
    ctx.moveTo(leftDot, rightDot);
    // 添加坐标点
    addDotText(leftDot, rightDot);
    $("addDot").innerText = "添加坐标";
    return;
  }

  // 添加点
  ctx.lineTo(leftDot, rightDot);
  ctx.stroke();
  addDotText(leftDot, rightDot);
  leftDot = null;
  rightDot = null;
};
