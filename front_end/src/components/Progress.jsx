const Progress = ({progress}) => {
    if (0 < progress && progress < 100) {
        return (
            <span className="font-semibold text-emerald-400 mr-auto">Progress: {progress}%</span>
        )
    }
}

export default Progress;