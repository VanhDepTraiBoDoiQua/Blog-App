const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-20">
			<div className="flex flex-col items-center justify-center gap-5">
				<h3 className="font-light text-4xl">Oops! Page not found</h3>
				<h1 className="font-extrabold text-8xl"><span>4</span><span>0</span><span>4</span></h1>
			</div>
			<h2 className="text-xl">We are sorry, but the page you requested was not found.</h2>
		</div>
    )
}

export default ErrorPage;