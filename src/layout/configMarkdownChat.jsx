export const configMessageIA = {
    a: ({ children, ...props }) => (
        <a className="underline hover:text-blue-400 tracking-wide font-bold" {...props} target="_blank">{children}</a>
    ),
    h1: ({ children, ...props }) => (
        <h1 className="text-3xl" {...props} >
            {children}
        </h1>
    ),
    h2: ({ children, ...props }) => (
        <h2 className="text-2xl" {...props} >
            {children}
        </h2>
    ),
    h3: ({ children, ...props }) => (
        <h3 className="text-xl" {...props} >
            {children}
        </h3>
    ),
    h4: ({ children, ...props }) => (
        <h4 className="text-lg" {...props} >
            {children}
        </h4>
    ),
    h5: ({ children, ...props }) => (
        <h5 className="text-base" {...props} >
            {children}
        </h5>
    ),
    p: ({ children, ...props }) => (
        <p className="text-base" {...props} >
            {children}
        </p>
    ),
    ul: ({ children, ...props }) => (
        <ul className="ps-5 mt-2 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-white" {...props} >
            {children}
        </ul>
    ),
    ol: ({ children, ...props }) => (
        <ol className="ps-5 mt-2 space-y-1 list-decimal list-inside" {...props} >
            {children}
        </ol>
    ),
    table: ({ children, ...props }) => (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 sm:mx-2 border-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" {...props} >
                {children}
            </table>
        </div>
    ),
    thead: ({ children, ...props }) => (
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-300 " {...props} >
            {children}
        </thead>
    ),
    th: ({ children, ...props }) => (
        <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800" {...props} >
            {children}
        </th>
    ),
    td: ({ children, ...props }) => (
        <td className="px-6 py-3 bg-gray-50 dark:bg-gray-700 dark:text-white dark:font-bold" {...props} >
            {children}
        </td>
    ),

}