interface Items {
  [key: number]: number;
}

class Stack {
  top: number;

  items: Items;

  constructor() {
    this.top = -1;
    this.items = {};
  }

  push(item: number): void {
    this.top += 1;
    this.items[this.top] = item;
  }

  get item(): number {
    return this.items[this.top];
  }

  pop(): number {
    const item = this.items[this.top];
    delete this.items[this.top];
    this.top -= 1;
    return item;
  }
}

describe('My Stack', () => {
  let stack: Stack;
  beforeEach(() => {
    stack = new Stack();
  });
  test('can be created', () => {
    expect(stack.top).toBe(-1);
    expect(stack.items).toEqual({});
  });
  test('can push to the top', () => {
    stack.push(4);
    expect(stack.top).toBe(0);
    expect(stack.item).toBe(4);
  });
  test('can pop off', () => {
    stack.push(4);
    stack.push(5);
    expect(stack.top).toBe(1);
    expect(stack.item).toBe(5);
    const five = stack.pop();
    expect(five).toBe(5);
    expect(stack.items).toEqual({ 0: 4 });
    expect(stack.top).toBe(0);
  });
});

function clone(array: Array<number>): Array<number> {
  return [...array];
}

describe('Cloning array', () => {
  test('new place in memory', () => {
    const array = [1, 2, 3, 4];
    const clonedArray = clone(array);
    expect(array).not.toBe(clonedArray);
    expect(array).toEqual(clonedArray);
  });
});

function sumar(a: number | null, b: number | null): number {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments should be valid numbers');
  }
  return a + b;
}

describe('simple sum', () => {
  test('sum', () => {
    expect(sumar(1, 3)).toBe(4);
    expect(sumar(0, 0)).toBe(0);
    expect(sumar(0, -5)).toBe(-5);
  });

  test('passing null', () => {
    expect(() => sumar(null, 5)).toThrow(TypeError);
  });
});

export {};
