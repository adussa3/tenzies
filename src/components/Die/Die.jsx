import "./Die.css";

export default function Die({ num, isFrozen, freezeDie }) {
    const styles = {
        backgroundColor: isFrozen ? "#59E391" : "white",
    };
    return (
        <div className="Die" style={styles} onClick={freezeDie}>
            <p>{num}</p>
        </div>
    );
}
