import React, { useEffect, useState } from "react";

function TreeNode({ node }) {
	return (
		<div className="tree-node">
			<strong>{node.name}</strong> {node.spouse ? `(${node.spouse})` : ""}
			{node.children.length > 0 && (
				<div className="children-container">
					{node.children.map((child) => (
						<TreeNode key={child.name} node={child} />
					))}
				</div>
			)}
		</div>
	);
}

function TreeComponent() {
	const [treeData, setTreeData] = useState(null);

	useEffect(() => {
		fetch("http://localhost:3000/data")
			.then((response) => response.json())
			.then((data) => setTreeData(data))
			.catch((error) => console.error("Fetch error:", error));
	}, []);

	return (
		<div id="tree-container" className="container mt-5">
			{treeData && <TreeNode node={treeData} />}
		</div>
	);
}

export default TreeComponent;
