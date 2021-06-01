/**
 * 背景网格线
 */
function drawGrid(color, step) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;

  for (var i = step; i < ctx.canvas.width; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ctx.canvas.height);
    ctx.stroke();
  }

  for (var j = step; j < ctx.canvas.height; j += step) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(ctx.canvas.width, j);
    ctx.stroke();
  }
}

/**
 * 画坐标轴
 */
function drawAxis() {
  ctx.save();
  ctx.strokeStyle = AXIS_COLOR;
  ctx.lineWidth = AXIS_LINEWIDTH;

  drawHorizontalAxis();
  drawVerticalAxis();

  ctx.lineWidth = TICKS_LINEWIDTH;
  ctx.strokeStyle = TICK_COLOR;

  drawVerticalAxisTicks();
  drawHorizontalAxisTicks();

  ctx.restore();
}

/**
 * 绘制x轴
 */
function drawHorizontalAxis() {
  ctx.beginPath();
  ctx.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
  ctx.lineTo(AXIS_RIGHT, AXIS_ORIGIN.y);
  ctx.stroke();
}

/**
 * 绘制y轴
 */
function drawVerticalAxis() {
  ctx.beginPath();
  ctx.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
  ctx.lineTo(AXIS_ORIGIN.x, AXIS_TOP);
  ctx.stroke();
}

/**
 * 绘制y轴刻度
 */
function drawVerticalAxisTicks() {
  //小刻度长度的临时变量
  var deltaY;

  for (var i = 1; i < NUM_VERTICAL_TICKS; i++) {
    ctx.beginPath();
    //每5第五个刻度为长的小刻度
    if (i % 5 === 0) deltaY = TICK_WIDTH;
    else deltaY = TICK_WIDTH / 2;

    ctx.moveTo(AXIS_ORIGIN.x - deltaY, AXIS_ORIGIN.y - i * MAGNIFICATION);
    ctx.lineTo(AXIS_ORIGIN.x + deltaY, AXIS_ORIGIN.y - i * MAGNIFICATION);
    ctx.stroke();
  }
}

/**
 * 绘制x轴刻度
 */
function drawHorizontalAxisTicks() {
  //小刻度长度的临时变量
  var deltaY;

  for (var i = 1; i < NUM_HORIZONTAL_TICKS; i++) {
    ctx.beginPath();
    //每5第五个刻度为长的小刻度
    if (i % 5 === 0) deltaY = TICK_WIDTH;
    else deltaY = TICK_WIDTH / 2;

    ctx.moveTo(AXIS_ORIGIN.x + i * MAGNIFICATION, AXIS_ORIGIN.y - deltaY);
    ctx.lineTo(AXIS_ORIGIN.x + i * MAGNIFICATION, AXIS_ORIGIN.y + deltaY);
    ctx.stroke();
  }
}
