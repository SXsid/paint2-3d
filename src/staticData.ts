export const data = {
  vertices: [
    -1,
    0,
    0, // 0 - Bottom-left
    1,
    0,
    0, // 1 - Bottom-right
    0,
    2,
    0, // 2 - Top peak
    -0.5,
    1,
    0.1, // 3 - Left-middle bar (slightly forward)
    0.5,
    1,
    0.1, // 4 - Right-middle bar (slightly forward)
  ],
  faces: [
    0,
    1,
    2, // Triangle connecting bottom and top
    0,
    3,
    2, // Left side of 'A'
    1,
    4,
    2, // Right side of 'A'
    3,
    4,
    0, // Middle bar (left)
    4,
    3,
    1, // Middle bar (right)
  ],
};
