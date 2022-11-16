import { Logger } from "../core/base/Logger";
import { MathUtil } from "./MathUtil";
import { IClone } from "./IClone";
import { ICopy } from "./ICopy";
import { Vector2 } from "./Vector2";
import { ELLIPSOID_LONG_RADIUS } from "../config";

export class Geodetic2 implements IClone<Geodetic2>, ICopy<Geodetic2, Geodetic2> {
  private _longitude: number;
  private _latitude: number;
  private _radLon: number;
  private _radLat: number;

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    if (value + 180 < MathUtil.zeroTolerance || value - 180 > MathUtil.zeroTolerance) {
      Logger.error("Longitude between -180 and 180 degreed.");
      return;
    }
    this._longitude = value;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    if (value + 90 < MathUtil.zeroTolerance || value - 90 > MathUtil.zeroTolerance) {
      Logger.error("Latitude between -90 and 90 degreed.");
      return;
    }
    this._latitude = value;
  }

  get radLon(): number {
    return this._radLon;
  }

  get radLat(): number {
    return this._radLat;
  }

  constructor(longitude: number, latitude: number) {
    this.longitude = longitude;
    this.latitude = latitude;
    this._radLon = MathUtil.degreeToRadian(longitude);
    this._radLat = MathUtil.degreeToRadian(latitude);
  }

  /**
   * Geographic coordinate system to Mercator coordinate system.
   * @returns Mercator value
   */
  toMercator(): Vector2 {
    // 弧长为 弧长 = 弧度 * 半径
    console.log(this.radLat, this.radLon, ELLIPSOID_LONG_RADIUS);
    const x = this.radLon * ELLIPSOID_LONG_RADIUS;
    const a = Math.PI / 4 + this.radLat / 2;
    const b = Math.tan(a);
    const c = Math.log(b);
    const y = ELLIPSOID_LONG_RADIUS * c;
    console.log(x, y);
    return new Vector2(x, y);
  }

  clone(): Geodetic2 {
    return new Geodetic2(this.longitude, this.latitude);
  }

  copyFrom(source: Geodetic2): Geodetic2 {
    this.longitude = source.longitude;
    this.latitude = source.latitude;

    return this;
  }
}
