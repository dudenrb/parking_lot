export class MinHeap {
  private data: number[] = [];

  size(): number { return this.data.length; }

  insert(val: number): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  peek(): number | null {
    return this.data.length ? this.data[0] : null;
  }

  pop(): number | null {
    if (this.data.length === 0) return null;
    const root = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return root;
  }

  private bubbleUp(idx: number) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.data[parent] > this.data[idx]) {
        [this.data[parent], this.data[idx]] = [this.data[idx], this.data[parent]];
        idx = parent;
      } else break;
    }
  }

  private bubbleDown(idx: number) {
    const n = this.data.length;
    while (true) {
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      let smallest = idx;
      if (left < n && this.data[left] < this.data[smallest]) smallest = left;
      if (right < n && this.data[right] < this.data[smallest]) smallest = right;
      if (smallest !== idx) {
        [this.data[smallest], this.data[idx]] = [this.data[idx], this.data[smallest]];
        idx = smallest;
      } else break;
    }
  }
}
