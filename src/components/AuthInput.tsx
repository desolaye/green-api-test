export const AuthInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="bg-transparent outline-none p-1 border rounded border-primary focus:border-yellow-500 hover:border-yellow-500 shadow-md transition-all"
      {...props}
    />
  )
}
