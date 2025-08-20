/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import RcTable from "rc-table";
import { ColumnsType } from "rc-table/lib/interface";
import { TableProps } from "rc-table/lib/Table";
import React from "react";

import "./Table.scss";

export type ITableProps<T> = TableProps<T>;

export type ITableColumnProps<T> = ColumnsType<T>;

export const Table = <T extends Record<string, any>>(props: ITableProps<T>) => {
  return <RcTable prefixCls="Table" {...props} />;
};
