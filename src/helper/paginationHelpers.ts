import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionsReturn = {
  page: number;
  limit: number;
  skip: number;
  sortConditions: { [key: string]: SortOrder };
};

const calculatePagination = (options: IOptions): IOptionsReturn => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  return {
    page,
    limit,
    skip,
    sortConditions,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
