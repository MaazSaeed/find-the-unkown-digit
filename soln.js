function solveExpression(exp)
{
  exp = exp.match(/\+|-|\*|=|(\d|\?)*/g);
  exp.pop();
  let len = exp.length;
  let exp2 = [];
  let i = 0;
  let pushed = false;
  if(exp[0] == '-')
  {
    exp2.push("-" + exp[i++ + 1]);
    i = 2;
    pushed = true;
  }

  for(; i < len; i++)
  {
    if(pushed && i == 3 && exp[3] == '-')
      exp2.push("-" + exp[i++ + 1])
    else if(!pushed && i == 2 && exp[2] == '-')
      exp2.push("-" + exp[i++ + 1]);
    else
      exp2.push(exp[i]);
  }
  
  if(exp2[exp2.length - 2] == '-')
  {
    let x = exp2.pop();
    exp2[exp2.length - 1] = "-" + x;
  }
  
  let used = {};
  len = exp2.length;
  for(i = 0; i < len; i++)
  {
    if(exp2[i] != '+' && exp2[i] != '-' && exp2[i] != '*')
    {
      for(let d of exp2[i])
        if(d >= '0' && d <= '9')
          used[d] = d;
    }
  }
  
  let digits = "0123456789";
  let cdigit = digits[0];
  i = 0;
  
  for(;i <= 9; ++i, cdigit = digits[i])
  {
    if(used[cdigit])
      continue;
    
    used[cdigit] = cdigit;
    
    let n1 = exp2[0];
    let n2 = exp2[2];
    let n3 = exp2[4];
    let op = exp2[1];
    
    if(n3.split('').every(e => e == '?') && n1.split('').every(e => e == '?') && n2.split('').every(e => e == '?'))
      return -1;
    
    if(n3.length == 1 && (n2.length > 1 || n1.length > 1))
      return 0;
    
    if((n1[0] == '?' || (n1[0] == '-' && n1[1] == '?')) && cdigit == '0')
      continue;
    
    if(found(n1, n2, n3, op, cdigit))
      return +cdigit;

  }
  
  return -1;
}

function found(n1, n2, n3, op, cdigit)
{
  n1 = n1.split('');
  n2 = n2.split('');
  n3 = n3.split('');
  for(let n = 0; n < n1.length; n++)
  {
    if(n1[n] == '?')
      n1[n] = cdigit;
  }
  
  for(let n = 0; n < n2.length; n++)
  {
    if(n2[n] == '?')
      n2[n] = cdigit;
  }
  
  for(let n = 0; n < n3.length; n++)
  {
    if(n3[n] == '?')
      n3[n] = cdigit;
  }
  
  n1 = +n1.join('');
  n2 = +n2.join('');
  n3 = +n3.join('');
  
  if(op == '+')
    return n1 + n2 == n3;
  
  if(op == '-')
    return n1 - n2 == n3;
  
  if(op == '*')
    return n1 * n2 == n3;
}
