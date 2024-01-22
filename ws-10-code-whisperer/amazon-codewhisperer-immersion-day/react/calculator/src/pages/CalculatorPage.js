// React component for start page with an example toast
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

// React component that renders a simple integer calculator
// supporting addition, subtraction, multiplication and division.
//
// example:
//   <CalculatorPage />

export default function CalculatorPage() {
  // component state:
  //    first: string; first value for calculations, use setFirst to change
  //    lastOperand: string; last operand for calculations, use setLastOperand to change
  //    second: string; second value for calculations, use setSecond to change
  //    result: string; result of calculations, use setResult to change
  const [first, setFirst] = useState('');
  const [lastOperand, setLastOperand] = useState('');
  const [second, setSecond] = useState('0');
  const [result, setResult] = useState('');

  function performIntegerOperation(first, second, operand) {
    switch (operand) {
      case 'add':
        return first + second;
      case 'sub':
        return first - second;
      case 'mul':
        return first * second;
      case 'div':
        return first / second;
      default:
        return 0;
    }
  }

  // invoked when clear button is clicked
  const handleClear = () => {
    setFirst('');
    setLastOperand('');
    setSecond('0');
    setResult('');
  };

  // invoked when a digit button is clicked
  const handleDigit = (digit) => {
    setResult('');
    setSecond(second.toString().replace(/^0+/, '') + digit);
  };

  // invoked when an operand button is clicked
  const handleOperand = (operand) => {
    if (lastOperand) {
      setFirst(Math.floor(performIntegerOperation(first, second, lastOperand)));
    } else if (result) {
      setFirst(result);
    } else {
      setFirst(second);
    }
    setLastOperand(operand);
    setSecond('0');
    setResult('');
  };

  // invoked when the equals button is clicked
  const handleEquals = () => {
    if (lastOperand) {
      setResult(Math.floor(performIntegerOperation(first, second, lastOperand)));
    } else if (second) {
      setResult(second);
    }
    setFirst('');
    setLastOperand('');
    setSecond('');
  };

  // defines the text for the operand buttons
  const operandText = {
    add: '+',
    sub: '-',
    mul: '*',
    div: '/',
    clear: 'AC',
    equals: '=',
  };

  // render the calculator page
  return (
    <Card className='shadow' style={{ width: '300px' }}>
      <div className='bg-black text-white text-end p-2 h2 text-nowrap overflow-hidden '>
        <div className='bg-black text-white text-end fs-6'>
          {first && lastOperand ? first + (operandText[lastOperand] || '') : '\u00a0'}
        </div>
        {result || second || '0'}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridGap: '10px',
          padding: '10px',
        }}
      >
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('7')}>
          7
        </Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('8')}>
          8
        </Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('9')}>
          9
        </Button>
        <Button className='btn btn-secondary' onClick={() => handleOperand('div')}>
          {operandText.div}
        </Button>

        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('4')}>
          4
        </Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('5')}>
          5
        </Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('6')}>
          6
        </Button>
        <Button className='btn btn-secondary' onClick={() => handleOperand('mul')}>
          {operandText.mul}
        </Button>

        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('1')}>
          1
        </Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('2')}>
          2
        </Button>
        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('3')}>
          3
        </Button>
        <Button className='btn btn-secondary' onClick={() => handleOperand('sub')}>
          {operandText.sub}
        </Button>

        <Button className='btn btn-light border border-dark' onClick={() => handleDigit('0')}>
          0
        </Button>
        <Button className='btn btn-primary' onClick={() => handleEquals()}>
          {operandText.equals}
        </Button>
        <Button className='btn btn-danger' onClick={() => handleClear()}>
          {operandText.clear}
        </Button>
        <Button className='btn btn-secondary' onClick={() => handleOperand('add')}>
          {operandText.add}
        </Button>
      </div>
    </Card>
  );
}
