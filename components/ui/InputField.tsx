const InputField = (
    type: string,
    name: string,
    className = '',
    ref,
    label: string,
    errors
) => {
    return (
        <>
            <label
                className="text-white mb-2 font-sans font-bold capitalize block"
                htmlFor={label}
            >
                {' '}
                {label}
            </label>
            <input
                type={type}
                name={name}
                className={`rounded text-white border border-gray-500 w-full p-2 bg-transparent ${className}`}
                ref={ref}
            />
            {errors && (
                <span className="text-red-300 font-sans text-lg my-4">
                    {errors.message}
                </span>
            )}
        </>
    )
}

export default InputField
