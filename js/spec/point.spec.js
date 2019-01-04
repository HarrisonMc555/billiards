'use strict';

const Point = require('../model/point');

describe('Point', function() {

  it('create at origin', function() {
    let point = new Point(0, 0);
    expect(point.x).toBe(0);
    expect(point.y).toBe(0);
  });

  it('create on positive x axis', function() {
    let point = new Point(5, 0);
    expect(point.x).toBe(5);
    expect(point.y).toBe(0);
  });

  it('create on negative x axis', function() {
    let point = new Point(-2, 0);
    expect(point.x).toBe(-2);
    expect(point.y).toBe(0);
  });

  it('create on positive y axis', function() {
    let point = new Point(0, 7);
    expect(point.x).toBe(0);
    expect(point.y).toBe(7);
  });

  it('create on negative y axis', function() {
    let point = new Point(0, -9);
    expect(point.x).toBe(0);
    expect(point.y).toBe(-9);
  });

  it('create in first quadrant', function() {
    let point = new Point(17, 24);
    expect(point.x).toBe(17);
    expect(point.y).toBe(24);
  });

  it('create in second quadrant', function() {
    let point = new Point(-100, 101);
    expect(point.x).toBe(-100);
    expect(point.y).toBe(101);
  });

  it('create in third quadrant', function() {
    let point = new Point(-30, -20);
    expect(point.x).toBe(-30);
    expect(point.y).toBe(-20);
  });

  it('create in fourth quadrant', function() {
    let point = new Point(73, -84);
    expect(point.x).toBe(73);
    expect(point.y).toBe(-84);
  });

  it('distance to self is zero', function() {
    let point1 = new Point(0, 0);
    expect(point1.getDistanceTo(point1)).toBe(0);
    let point2 = new Point(4, 2);
    expect(point2.getDistanceTo(point2)).toBe(0);
    let point3 = new Point(-7, 6);
    expect(point3.getDistanceTo(point3)).toBe(0);
    let point4 = new Point(-5, -3);
    expect(point4.getDistanceTo(point4)).toBe(0);
    let point5 = new Point(8, 1);
    expect(point5.getDistanceTo(point5)).toBe(0);
  });

  it('distance along axis', function() {
    let point1 = new Point(0, 0);
    let point2 = new Point(0, 2);
    let point3 = new Point(3, 2);
    let point4 = new Point(3, 0);

    expect(point1.getDistanceTo(point2)).toBe(2);
    expect(point2.getDistanceTo(point1)).toBe(2);

    expect(point2.getDistanceTo(point3)).toBe(3);
    expect(point3.getDistanceTo(point2)).toBe(3);

    expect(point3.getDistanceTo(point4)).toBe(2);
    expect(point4.getDistanceTo(point3)).toBe(2);

    expect(point4.getDistanceTo(point1)).toBe(3);
    expect(point1.getDistanceTo(point4)).toBe(3);
  });

  it('distance along square', function() {
    let point1 = new Point(0, 0);
    let point2 = new Point(5, 5);
    let point3 = new Point(7, 7);

    expect(point1.getDistanceTo(point2)).toBeCloseTo(Math.sqrt(50), 4);
    expect(point2.getDistanceTo(point1)).toBeCloseTo(Math.sqrt(50), 4);

    expect(point2.getDistanceTo(point3)).toBeCloseTo(Math.sqrt(8), 4);
    expect(point3.getDistanceTo(point2)).toBeCloseTo(Math.sqrt(8), 4);

    expect(point1.getDistanceTo(point3)).toBeCloseTo(Math.sqrt(98), 4);
    expect(point3.getDistanceTo(point1)).toBeCloseTo(Math.sqrt(98), 4);
  });

  it('distance along axis', function() {
    let point1 = new Point(0, 0);
    let point2 = new Point(0, 2);
    let point3 = new Point(3, 2);
    let point4 = new Point(3, 0);

    expect(point1.getDistanceSquaredTo(point2)).toBe(4);
    expect(point2.getDistanceSquaredTo(point1)).toBe(4);

    expect(point2.getDistanceSquaredTo(point3)).toBe(9);
    expect(point3.getDistanceSquaredTo(point2)).toBe(9);

    expect(point3.getDistanceSquaredTo(point4)).toBe(4);
    expect(point4.getDistanceSquaredTo(point3)).toBe(4);

    expect(point4.getDistanceSquaredTo(point1)).toBe(9);
    expect(point1.getDistanceSquaredTo(point4)).toBe(9);
  });

  it('distance squared along square', function() {
    let point1 = new Point(0, 0);
    let point2 = new Point(5, 5);
    let point3 = new Point(7, 7);

    expect(point1.getDistanceSquaredTo(point2)).toBeCloseTo(50, 4);
    expect(point2.getDistanceSquaredTo(point1)).toBeCloseTo(50, 4);

    expect(point2.getDistanceSquaredTo(point3)).toBeCloseTo(8, 4);
    expect(point3.getDistanceSquaredTo(point2)).toBeCloseTo(8, 4);

    expect(point1.getDistanceSquaredTo(point3)).toBeCloseTo(98, 4);
    expect(point3.getDistanceSquaredTo(point1)).toBeCloseTo(98, 4);
  });

  // xit('distance to axis aligned line...', function() {
  //   // TODO
  // });
  
});
