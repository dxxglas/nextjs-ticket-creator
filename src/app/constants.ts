export const DefaultCustomField = {
  AccountName: Number(process.env.ACCOUNT_FIELD),
};

export const OrdersCustomFields = {
  ...DefaultCustomField,
  OrderNumber: Number(process.env.ORD_NUMBER_FIELD),
  AffectingAllUsers: Number(process.env.ORD_AFFECTED_FIELD),
};

export const PaymentsCustomFields = {
  ...DefaultCustomField,
  TransactionNumber: Number(process.env.PAY_T_NUMBER_FIELD),
  TransactionStatus: Number(process.env.PAY_T_STATUS_FIELD),
  PaymentAcquirer: Number(process.env.PAY_ACQUIRER_FIELD),
};

export const CatalogCustomFields = {
    ...DefaultCustomField,
    SkuId: Number(process.env.CAT_SUKID_FIELD),
    PrintPage: Number(process.env.CAT_PRINT_FIELD),
  };
