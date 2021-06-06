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
  // 添加点之后清空输入框
  $("dotInput").value = "";
}
// 重置
$("resetButton").onclick = function () {
  location.reload();
};
// 闭合
$("closeButton").onclick = function () {
  ctx.closePath();
  ctx.stroke();
  $("areaButton").style.display = "inline-block";
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
  // 加入点数组中
  dotArr.push([leftDot, rightDot]);
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
$("areaButton").onclick = function () {
  // console.log(dotArr);
  if (dotArr.length < 3) {
    alert("小于3个点无法计算～");
    return;
  }
  for (let i = 0, len = dotArr.length; i < len; i++) {
    iArea +=
      dotArr[i][0] * dotArr[(i + 1) % len][1] -
      dotArr[(i + 1) % len][0] * dotArr[i][1];
  }
  //
  iArea = Math.abs(iArea * 0.5) / Math.pow(MAGNIFICATION, 2);
  $("areaText").innerText = `计算面积结果：${iArea}`;
  $("areaText").style.display = "inline-block";
};
