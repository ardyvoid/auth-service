export const customer = (authUser: any) => {
  return { __typename: "Customer", authUserId: authUser.id };
}
