const useCheckMembership = (identityCommitment) => {
  let check = false
  if (identityCommitment) {
    check = true
  }
  return { check }
}
export default useCheckMembership
