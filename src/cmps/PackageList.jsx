import { PackagePreview } from "./PackagePreview";

export function PackageList({ packages }) {
    console.log("PackageList , packages", packages)
    return (
        <>
        <div className="package-list">
            {packages.map(pack => <PackagePreview pack={pack}></PackagePreview>)}
        </div>
        </>
    )
}
