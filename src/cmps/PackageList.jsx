import { PackagePreview } from "./PackagePreview";

export function PackageList({ packages }) {
    console.log("PackageList , packages", packages)
    return (
        <>
        <h2>Compare Packages</h2>
        <table className="package-list">
            {packages.map(pack => <PackagePreview pack={pack}></PackagePreview>)}
        </table>
        </>
    )
}
