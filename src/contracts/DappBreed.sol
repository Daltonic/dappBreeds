//SPDX-License-Identifier:MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Base64.sol";

contract DappBreed is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct TraitStruct {
        string name;
        string description;
        string weapon;
        string image;
        string environment;
        uint256 rarity;
        bool breeded;
        uint256[] parents;
    }

    struct MintStruct {
        uint256 id;
        address owner;
        uint256 mintCost;
        uint256 timestamp;
        TraitStruct traits;
    }

    string public baseURI;
    uint256 public maxSupply;
    string public baseExtension = ".json";
    string public imageExtension = ".webp";
    uint256 public mintCost = 0.005 ether;
    uint256 public totalBalance;

    mapping(uint256 => MintStruct) minted;
    mapping(uint256 => bool) tokenIdExist;

    string[] weapons = [
        "Stick",
        "Knife",
        "Blade",
        "Club",
        "Ax",
        "Sword",
        "Spear",
        "Halberd"
    ];
    string[] environments = [
        "Space",
        "Sky",
        "Deserts",
        "Forests",
        "Grasslands",
        "Mountains",
        "Oceans",
        "Rainforests"
    ];
    uint256[] rarities = new uint256[](5);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _BaseURI,
        uint256 _maxSupply
    ) ERC721(_name, _symbol) {
        baseURI = _BaseURI;
        maxSupply = _maxSupply;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function mintNft() public payable nonReentrant {
        require(
            _tokenIdCounter.current() <= maxSupply,
            "Out of tokens, check back later"
        );
        require(
            msg.value > 0 ether && msg.value >= mintCost,
            "Insufficient fund for minting"
        );

        _tokenIdCounter.increment();
        uint256 _tokenId = _tokenIdCounter.current();

        require(_performMinting(_tokenId), "minting unsuccessful");

        TraitStruct memory nft;
        nft.name = string(
            abi.encodePacked(symbol(), " #", _tokenId.toString())
        );
        nft
            .description = "This is a minted AI generated artworks available for your use.";
        nft.weapon = weapons[randomNum(weapons.length, currentTime(), 0)];
        nft.environment = environments[
            randomNum(environments.length, currentTime(), 0)
        ];
        nft.rarity = randomNum(rarities.length, currentTime(), 0);
        nft.image = string(
            abi.encodePacked(baseURI, _tokenId.toString(), imageExtension)
        );
        minted[_tokenId].traits = nft;
        payTo(owner(), msg.value);
    }

    function breedNft(
        uint256 _fatherTokenId,
        uint256 _motherTokenId
    ) public payable nonReentrant {
        require(tokenIdExist[_fatherTokenId], "Father does not exist");
        require(tokenIdExist[_motherTokenId], "Mother does not exist");
        require(
            _tokenIdCounter.current() <= maxSupply,
            "Out of tokens, check back later"
        );
        require(
            msg.value > 0 ether && msg.value >= mintCost,
            "Insufficient fund for minting"
        );

        _tokenIdCounter.increment();
        uint256 _tokenId = _tokenIdCounter.current();

        require(_performMinting(_tokenId), "minting unsuccessful");

        TraitStruct memory nft;
        nft.name = string(
            abi.encodePacked(symbol(), " #", _tokenId.toString())
        );
        nft
            .description = "This is an inherited AI generated artworks available for your use.";
        nft.weapon = minted[_fatherTokenId].traits.weapon;
        nft.environment = minted[_motherTokenId].traits.environment;
        nft.rarity = randomNum(rarities.length, block.timestamp, 0);
        nft.breeded = true;
        nft.parents = new uint256[](2);
        nft.parents[0] = _fatherTokenId;
        nft.parents[1] = _motherTokenId;
        nft.image = string(
            abi.encodePacked(baseURI, _tokenId.toString(), imageExtension)
        );

        minted[_tokenId].traits = nft;
        payTo(owner(), msg.value);
    }

    function getAllNfts() public view returns (MintStruct[] memory Minted) {
        Minted = new MintStruct[](_tokenIdCounter.current());
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            Minted[i] = minted[i + 1];
        }
    }

    function getMintedNfts() public view returns (MintStruct[] memory Minted) {
        uint256 available;
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (!minted[i + 1].traits.breeded) available++;
        }

        Minted = new MintStruct[](available);

        uint256 index;
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (!minted[i + 1].traits.breeded) Minted[index++] = minted[i + 1];
        }
    }

    function getBreededNfts() public view returns (MintStruct[] memory Minted) {
        uint256 available;
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (minted[i + 1].traits.breeded) available++;
        }

        Minted = new MintStruct[](available);

        uint256 index;
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (minted[i + 1].traits.breeded) Minted[index++] = minted[i + 1];
        }
    }

    function getMyNfts() public view returns (MintStruct[] memory Minted) {
        uint256 available;
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (minted[i + 1].owner == msg.sender) available++;
        }

        Minted = new MintStruct[](available);

        uint256 index;
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (minted[i + 1].owner == msg.sender)
                Minted[index++] = minted[i + 1];
        }
    }

    function getParentsOf(
        uint256 _tokenId
    ) public view returns (MintStruct[] memory Minted) {
        if (!minted[_tokenId].traits.breeded) {
            Minted = new MintStruct[](0);
            return Minted;
        }

        Minted = new MintStruct[](minted[_tokenId].traits.parents.length);
        uint256 index;
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (
                minted[i + 1].id == minted[_tokenId].traits.parents[0] ||
                minted[i + 1].id == minted[_tokenId].traits.parents[1]
            ) {
                Minted[index++] = minted[i + 1];
            }
        }
    }

    function getNft(uint256 _tokenId) public view returns (MintStruct memory) {
        return minted[_tokenId];
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function _performMinting(uint256 _tokenId) internal returns (bool) {
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, tokenURI(_tokenId));

        MintStruct memory mint;
        mint.id = _tokenId;
        mint.owner = msg.sender;
        mint.mintCost = msg.value;
        mint.timestamp = currentTime();

        minted[_tokenId] = mint;
        tokenIdExist[_tokenId] = true;

        return true;
    }

    function _burn(
        uint256 _tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(_tokenId);
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return buildMetadata(_tokenId);
    }

    function buildMetadata(
        uint256 _tokenId
    ) internal view returns (string memory) {
        TraitStruct memory traits = minted[_tokenId].traits;
        uint256 timestamp = currentTime();

        bytes memory attributesJson = buildAttributesJson(
            traits.environment,
            traits.weapon,
            traits.rarity,
            timestamp
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"id":"',
                                _tokenId.toString(),
                                '","name":"',
                                traits.name,
                                '","description":"',
                                traits.description,
                                '","price":"',
                                mintCost.toString(),
                                '","image":"',
                                traits.image,
                                '","attributes":',
                                attributesJson,
                                "}"
                            )
                        )
                    )
                )
            );
    }

    function buildAttributesJson(
        string memory _environment,
        string memory _weapon,
        uint256 _rarity,
        uint256 _timestamp
    ) internal pure returns (bytes memory) {
        return
            abi.encodePacked(
                '[{"trait_type":"Environment","value":"',
                _environment,
                '"},',
                '{"trait_type":"Weapon","value":"',
                _weapon,
                '"},',
                '{"trait_type":"Rarity","value":"',
                _rarity.toString(),
                '"},',
                '{"display_type":"date","trait_type":"Created","value":"',
                _timestamp.toString(),
                '"}]'
            );
    }

    function randomNum(
        uint256 _mod,
        uint256 _seed,
        uint256 _salt
    ) internal view returns (uint256) {
        uint256 num = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, _seed, _salt)
            )
        ) % _mod;
        return num;
    }

    function currentTime() internal view returns (uint256) {
        uint256 newNum = (block.timestamp * 1000) + 1000;
        return newNum;
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
