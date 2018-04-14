// eslint-disable-next-line import/prefer-default-export
export const Mongo = {
  Collection: jest.fn().mockImplementation(() => ({
    _ensureIndex: (jest.fn()),
  })),
};
