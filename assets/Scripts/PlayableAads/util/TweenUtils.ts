// TweenUtils.ts
import { Vec3 } from 'cc';

/**
 * Bezier bậc 2 (qua 3 điểm)
 */
export function getQuadraticBezierPoint(t: number, p0: Vec3, p1: Vec3, p2: Vec3): Vec3 {
    const x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
    const y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;
    const z = Math.pow(1 - t, 2) * p0.z + 2 * (1 - t) * t * p1.z + Math.pow(t, 2) * p2.z;
    return new Vec3(x, y, z);
}

/**
 * Bezier bậc 3 (qua 4 điểm)
 */
export function getCubicBezierPoint(t: number, p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3): Vec3 {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
    const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;
    const z = uuu * p0.z + 3 * uu * t * p1.z + 3 * u * tt * p2.z + ttt * p3.z;
    return new Vec3(x, y, z);
}
