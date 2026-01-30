

export function contrastinator(color: string, contrast1: string, contrast2: string) {
  
  const colorBright = getBrightness(color);
  const contrBright1 = getBrightness(contrast1);
  const contrBright2 = getBrightness(contrast2);

  const comp1 = Math.abs(colorBright - contrBright1);
  const comp2 = Math.abs(colorBright - contrBright2);
  
  if(comp1 >= comp2) {
    return contrast1;
  } else {
    return contrast2;
  }
}

export function hexToRgb(hex) {
  // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getBrightness(color: string): number {

  const rgb = hexToRgb(color);
  return (rgb.r * 0.299) + (rgb.g * 0.587) + (rgb.b * 0.114);
}


export function shady(color: string, amount: number = 0.1, retType: string = 'hex', newOpacity?: number) {
  
  let t = 255;
  let p = amount;
  
  if(amount < 0) {
    t = 0;
    p = amount * -1;
  }
  let rgb = {r: 0, g: 0, b: 0, a: null};
  
  if(color[0] === '#') {
    rgb = Object.assign({}, rgb, hexToRgb(color));
   
  } else if(color[0] === 'r') {
    const arr = color.split(',');
    rgb.r = +arr[0];
    rgb.g = +arr[1];
    rgb.b = +arr[2];
    rgb.a = arr.length === 4 ? +arr[3] : rgb.a;
  } else {
    console.error('invalid color', color);
    return null;
  }
  
  if(newOpacity) {
    rgb.a = newOpacity;
  }
  
  const r = Math.round((t - rgb.r) * p) + rgb.r;
  const g = Math.round((t - rgb.g) * p) + rgb.g;
  const b = Math.round((t - rgb.b) * p) + rgb.b;
  
  let newamt;
  if(retType === 'rgba' && rgb.a !== null) {
    newamt = 'rgba(' + [r, g, b, rgb.a].join(',') + ')';
  } else if(retType === 'rgba' && rgb.a === null) {
    newamt = 'rgba(' + [r, g, b].join(',') + ',1)';
  } else if(retType === 'rgb') {
    newamt = 'rgb(' + [r, g, b].join(',') + ')';
  } else {
    newamt = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  }
  return newamt;
  
}
















