// import { UserRegistration } from './interfaces/registration';
import gql from 'graphql-tag';
// 1
export const CREATE_USER_MUTATION = gql`
# 2
  mutation UserRegistrationMutation($firstName: String!, $lastName: String!,
  $email: String!, $businessAddress: String!, $homeAddress: String!,
  $gender: String!, $state: String!, $lga: String!, $savingsCategory: String!,
  $pin: String!, $status: String!, $loanStatus: String!, $phone: String!, $password: String!,
  $passwordString: String!, $latitude: String!, $longitude: String!, $userType: String!) {
    createUser(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      businessAddress: $businessAddress,
      homeAddress: $homeAddress,
      gender: $gender,
      state: $state,
      lga: $lga,
      savingsCategory: $savingsCategory,
      pin: $pin,
      status: $status,
      loanStatus: $loanStatus,
      phone: $phone,
      password: $password,
      passwordString: $passwordString,
      latitude: $latitude,
      longitude: $longitude,
      userType: $userType
    ) {
      pin
    }
  }
`;

export const GET_USER_MAIL = gql`
  query UserMailQuery($phone: String!) {
    getUser(
      phone: $phone
    ) {
      email
      id
      firstName
      lastName
      phone
      savingsCategory
      businessAddress
      homeAddress
      gender
      state
      lga
      pin
      status
      loanStatus
      accountBalance
      userType
    }
  }
`;

export const ALL_USERS = gql`
  query getAllUsers{
    allUsers{
      email
      id
      firstName
      lastName
      homeAddress
      businessAddress
      phone
      state
      lga
      gender
      savingsCategory
      status
      pin
      loanStatus
      latitude
      longitude
      registrationDate
      userType
      accountBalance
      repaymentAmount
      lastLogin
    }
  }
`;

export const ADMIN_USER = gql`
query UserMailQuery($email: String!) {
  adminUser(
    email: $email
) {
    isAdmin
    id
  }
}
`;

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    tokenAuth(
      email: $email,
      password: $password
    ) {
      token
    }
  }
`;

export const PAYMENT = gql`
    mutation MakePayments($amount: Float!, $savingsCategory: String!, $referenceId: String!, $purpose: String!, $transactionType: String!) {
        makePayments(
            amount: $amount,
            savingsCategory: $savingsCategory,
            referenceId: $referenceId,
            purpose: $purpose,
            transactionType: $transactionType
        ) {
            referenceId
        }
    }
`;

export const CATEGORIES = gql`
    query getCategoriesQuery{
        getCategories(categoryStatus: true){
            categoryName
        }
    }
`;

export const API_PRODUCTS = gql`
    query activeProducts{
        getProducts(productStatus: true){
        productName
        productPrice
        warranty
        sku
        productCategory{
          categoryName
        }
        productDescription
        productImage
        id
      }
    }
`;

export const GET_REQUESTED_LOANS = gql`
  query getAllRequestedLoans{
    getRequestedLoan{
      id
      user{
        id
        email
        phone
        accountBalance
        loanStatus
        newCustomer
        repaymentAmount
      }
      productName
      itemPrice
      productCategory
      sku
      dueDate
      pendingRequest
      repaymentCategory
      requestedChoice
      dateApplied
    }
  }
`;

export const UPDATE_APPROVAL = gql`
  mutation updateApproval($userId: Int, $accountBalance: Float, $loanStatus: String, $newCustomer: Boolean, $repaymentAmount: Float){
    updateApproval(
      userId: $userId,
      accountBalance: $accountBalance,
      loanStatus: $loanStatus,
      newCustomer: $newCustomer,
      repaymentAmount: $repaymentAmount
    ){
      userId
      accountBalance
      loanStatus
      newCustomer
      repaymentAmount
    }
  }
`;

export const APPROVE_LOAN = gql`
  mutation approveLoanRequest($loanId: Int, $approvalStatus: Boolean, $pendingRequest: Boolean){
    approveLoan(
      loanId: $loanId,
      approvalStatus: $approvalStatus,
      pendingRequest: $pendingRequest
    ){
      success
    }
  }
`;

export const GET_GUARANTORS = gql`
  query getLoanGuarantors{
    getLoanGuarantors{
      user{
        email
        phone
      }
      guarantorFirstname
      guarantorLastname
      gaurantorPhone1
      guarantorPhone2
      guarantorAddress
      guarantorAddress2
      guarantorState
      guarantorLga
      guarantorMail
      guarantorOccupation
      requestedLoan
      uploadDate
      latitude
      longitude
    	guarantorSex
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories{
    getAllCategories{
      id
      categoryName
      categoryStatus
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddNewCategory($categoryName: String, $categoryStatus: Boolean){
    addCategory(
      categoryName: $categoryName,
      categoryStatus: $categoryStatus
    ){
      success
    }
  }
`;

export const EDIT_CATEGORY = gql`
  mutation UpdateCurrentCategory($categoryId: Int, $categoryName: String, $categoryStatus: Boolean){
    updateCategory(
      categoryId: $categoryId,
      categoryName: $categoryName,
      categoryStatus: $categoryStatus
    ){
      success
    }
  }
`;

export const REQUEST_PRODUCT = gql`
    mutation ApplyForProduct($productCategory: String!, $productName: String!, $productPrice: Float!, $sku: String!){
        orderProducts(
            productCategory: $productCategory,
            productName: $productName,
            productPrice: $productPrice,
            sku: $sku
        ){
            success
        }
    }
`;

export const LOAN_STATUS = gql`
    query activeLoan{
        identifyUser{
            id
            loanStatus
            accountBalance
            repaymentAmount
            newCustomer
            loanId
         }
    }
`;

export const UPDATE_ACCOUNT_BALANCE = gql`
    mutation updateAccount($accountBalance: Float!, $repaymentAmount: Float!){
        updateAccountBalance(
          accountBalance: $accountBalance,
          repaymentAmount: $repaymentAmount
        ){
          accountBalance
          success
        }
    }
`;

export const SYSTEM_SETTINGS = gql`
    query getSysemSetting{
        systemSettings{
        minimumLoanAmount
        savingsPercentage
        maximumLoanAmount
        initialUserMaxAmount
        loanDefaultAmount
      }
    }
`;

export const UPDATE_SETTINGS = gql`
  mutation updateSettings(
    $initialUserMaxAmount: Int,
    $loanDefaultAmount: Int,
    $maximumLoanAmount: Int,
    $minimumLoanAmount: Int,
    $savingsPercentage: Int
  ){
    updateSettings(
      initialUserMaxAmount: $initialUserMaxAmount,
      loanDefaultAmount: $loanDefaultAmount,
      maximumLoanAmount: $maximumLoanAmount,
      minimumLoanAmount: $minimumLoanAmount,
      savingsPercentage: $savingsPercentage
    ){
        minimumLoanAmount
        savingsPercentage
        maximumLoanAmount
        initialUserMaxAmount
        loanDefaultAmount
    }
  }
`;

export const READ_SUPPORT_MSG = gql`
  mutation updateSupportRead($msgId: Int, $readStatus: Boolean){
    updateRead(msgId: $msgId, readStatus: $readStatus){
      success
    }
  }
`;

export const UPLOAD_GUARANTOR = gql`
    mutation uploadGuarantor(
        $gaurantorPhone1: String!,
        $guarantorAddress: String!,
        $guarantorAddress2: String,
        $guarantorFirstname: String!,
        $guarantorLastname: String!,
        $guarantorLga: String!,
        $guarantorMail: String!,
        $guarantorOccupation: String!,
        $guarantorPhone2: String,
        $guarantorSex: String!,
        $guarantorState: String!,
        $latitude: String!,
        $longitude: String!,
        $requestId: String!,
        $requestedChoice: String!,
        $requestedLoan: Float!){
            addLoanGaurantor(
                gaurantorPhone1: $gaurantorPhone1,
                guarantorPhone2: $guarantorPhone2,
                guarantorAddress: $guarantorAddress,
                guarantorAddress2: $guarantorAddress2,
                guarantorFirstname: $guarantorFirstname,
                guarantorLastname: $guarantorLastname,
                guarantorState: $guarantorState,
                guarantorLga: $guarantorLga,
                guarantorMail: $guarantorMail,
                guarantorOccupation: $guarantorOccupation,
                guarantorSex: $guarantorSex,
                latitude: $latitude,
                longitude: $longitude,
                requestId: $requestId,
                requestedChoice: $requestedChoice,
                requestedLoan: $requestedLoan
            ){
                requestId
            }
    }
`;

export const VERIFY_PIN = gql`
    query VerifyPin($pin: String!, $phone: String!){
        verifyPin(pin: $pin, phone: $phone){
            pin
          }
    }
`;

export const TRANSACTION_HISTORY = gql`
    query VerifyPin($pin: String!, $phone: String!){
        verifyPin(pin: $pin, phone: $phone){
            accountBalance
            transactionSet{
              amount,
              transactionDate,
              purpose,
              referenceId
            }
            loanStatus
            repaymentAmount
          }
    }
`;

export const LOAN_REQUEST = gql`
    mutation uploadLoanRequest(
        $itemPrice: Float,
        $loanId: String,
        $productCategory: String,
        $productName: String,
        $repaymentCategory: String,
        $requestedChoice: String,
        $sku: String
    ){
        loanRequest(
        itemPrice: $itemPrice,
        loanId: $loanId,
        productCategory: $productCategory,
        productName: $productName,
        repaymentCategory: $repaymentCategory,
        requestedChoice: $requestedChoice,
        sku: $sku
        ){
            success
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUserAdmin(
    $businessAddress: String!,
    $email: String!,
    $firstName: String!,
    $gender: String!,
    $homeAddress: String!,
    $lastName: String!,
    $latitude: String!,
    $lga: String!,
    $longitude: String!,
    $password: String!,
    $phone: String!,
    $pin: String!,
    $savingsCategory: String!,
    $state: String!,
    $id: Int!
    ){
        updateUserAdmin(
            businessAddress: $businessAddress,
            email: $email,
            firstName: $firstName,
            gender: $gender,
            homeAddress: $homeAddress,
            lastName: $lastName,
            latitude: $latitude,
            lga: $lga,
            longitude: $longitude,
            password: $password,
            phone: $phone,
            pin: $pin,
            savingsCategory: $savingsCategory,
            state: $state,
            id: $id
        ){
            success
        }
    }
`;

export const UPLOAD_SUPPORT = gql`
    mutation uploadSupport(
        $email: String,
        $message: String,
        $phone: String,
        $username: String
    ){
        support(
            email: $email,
            message: $message,
            phone: $phone,
            username: $username
        ){
            success
        }
    }
`;

export const GET_SUPPORT_INFO = gql`
  query getSupportInfo{
                    getSupportInfo{
                      id
                      username
                      phone
                      email
                      message
                      readStatus
                    }
                  }
`;

export const ALL_TRANSACTIONS = gql`
  query getAllTransactions{
    getAllTransactions{
      id
      user{
        phone
        email
      }
      amount
      savingsCategory
      referenceId
      purpose
      transactionTime
      transactionDate
      transactionType
    }
  }
`;

export const UPDATE_LOAN_STATUS = gql`
    mutation updateLoanStatus($loanStatus: String!){
        updateLoanStatusAfterApply(loanStatus: $loanStatus){
            success
        }
    }
`;

export const MAKE_WITHDRAWALS = gql`
    mutation makeWithdrawals(
    $amount: Float,
    $accountNumber: String,
    $accountName: String,
    $bankName: String
    ){
        makeWithdrawals(
            amount: $amount,
            accountNumber: $accountNumber,
            accountName: $accountName,
            bankName: $bankName
        ){
            success
        }
    }
`;

export const GET_WITHDRAWALS = gql`
  query getAllWithdrawals{
    getWithdrawals{
      id
      user{
        id
        phone
        email
        accountBalance
      }
      amount
      accountNumber
      accountName
      bankName
      read
      timeApplied
      dateApplied
    }
  }
`;

export const ADD_PRODUCTS = gql`
  mutation addProducts(
    $productName: String,
    $productPrice: Float,
    $productCategory: String,
    $productDescription: String,
    $warranty: String,
    $productImage: Upload,
    $sku: String
  ){
    addProducts(
      productName: $productName,
      productPrice: $productPrice,
      productCategory: $productCategory,
      productDescription: $productDescription,
      warranty: $warranty,
      productImage: $productImage,
      sku: $sku
    ){
      success
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $productName: String,
    $productPrice: Float,
    $productCategory: String,
    $productDescription: String,
    $warranty: String,
    $productImage: Upload,
    $sku: String,
    $productId: Int
  ){
    updateProduct(
      productName: $productName,
      productPrice: $productPrice,
      productCategory: $productCategory,
      productDescription: $productDescription,
      warranty: $warranty,
      productImage: $productImage,
      sku: $sku,
      productId: $productId
    ){
      success
    }
  }
`;

export const ACCT_BALANCE_UPDATE_WITHDRAWAL = gql`
  mutation updateUserAccountWithdrawal($accountBalance: Float, $userId: Int){
    updateAccountWithdrawal(
      accountBalance: $accountBalance,
      userId: $userId
    ){
      success
    }
  }
`;

export const WITHDRAWAL_APPROVED_UPDATE = gql`
  mutation updateUserApprovedWithdrawal($read: Boolean, $requestId: Int){
    updateApprovedWithdrawal(
      read: $read,
      requestId: $requestId
    ){
      success
    }
  }
`;

export const GET_UNREAD_WITDRWAAL = gql`
  query getUnreadWitdrawal{
    getUnreadWithdrawal(read: false){
      id
    }
  }
`;

export const GET_UNREAD_SUPPORT = gql`
  query getUnreadSupport{
    getUnreadSupport(readStatus: false){
    id
  }
  }
`;

export const GET_TODAYS_TRANSACTION = gql`
  query getTodaysTransaction{
    getTodaysTransaction{
    user{
      firstName
      lastName
    }
    amount
    transactionType
    referenceId
    transactionDate
  }
  }
`;

// 3
// export interface CreateLinkMutationResponse {
//     createLink: UserRegistration;
//     loading: boolean;
// }
