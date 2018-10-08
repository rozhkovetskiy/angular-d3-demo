export class ChartConfig {
  public width: number;
  public height: number;

  constructor(data: any = {}) {
    this.width = data.width || 0;
    this.height = data.height || 0;
  }
}
